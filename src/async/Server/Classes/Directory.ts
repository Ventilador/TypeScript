import { Dictionary, EmptyObject } from "../../definitions";

const { sep, normalize, basename, resolve, dirname, extname } = require("path");
// [.ttf(\?v=\d+\.\d+\.\d+)?$/, /\.eot(\?v=\d+\.\d+\.\d+)?$/, /\.svg(\?v=\d+\.\d+\.\d+)?$/]
const fastExtensions = {
    ".ts": true,
    ".html": true,
    ".css": true,
    ".less": true,
    ".js": true,
    ".json": true,
    ".png": true,
    ".woff": true,
    ".ttf": true,
    ".eot": true,
    ".svg": true,
    ".jpeg": true,
    ".jpg": true,
    ".gif": true
} as Dictionary<boolean>;
const NULL = null as any;
class NodeItem {
    public val: any;
    public static MakeRoot() {
        return new NodeItem("", NULL);
    }
    private _lowname: string;
    private _fullPath: string;
    private children: Dictionary<NodeItem>;
    private constructor(public name: string, private parent: NodeItem) {
        this.val = NULL;
        this._lowname = name.toLowerCase();
    }
    nameIs(name: string) {
        return this._lowname === name.toLowerCase();
    }
    isLeaf() {
        return !this.children;
    }
    createChild(name: string) {
        if (!this.children) {
            this.children = new EmptyObject();
        }
        return this.children[name.toLowerCase()] = new NodeItem(name, this);
    }
    getChild(name: string) {
        return this.children && this.children[name.toLowerCase()];
    }
    hasChild(name: string) {
        return !!(this.children && this.children[name.toLowerCase()]);
    }
    getChildren() {
        return this.children && Object.keys(this.children).map(childrenName, this.children) || [];
    }
    remove() {
        if (this.parent) {
            delete this.parent.children[this.name.toLowerCase()];
            this.name = this._lowname = this.val = this.children = NULL;
        }
    }
    getParent() {
        return this.parent;
    }
    fullPath() {
        if (this._fullPath) {
            return this._fullPath;
        }
        let cur = this as NodeItem;
        let path = cur.name;
        while ((cur = cur.parent)) {
            path = cur.name ? cur.name + sep + path : path;
        }

        return this._fullPath = normalize(path);
    }
}
function childrenName(this: Dictionary<NodeItem>, child: any) {
    return this[child].name;
}

// tslint:disable-next-line:variable-name
export const Directory = (() => {
    const root = NodeItem.MakeRoot();
    let exts: string[];
    let matchers: RegExp[];
    const fakeNodeModules = "C:/fake/node_modules/";

    const service = {
        get NODE_MODULES() {
            // KEEP IN SYNC!!
            // const fakeNodeModules = "C:/fake/node_modules/";
            return "C:/fake/node_modules/";
        },
        set<T>(path: string, content: T): T {
            return getNode(path, true).val = content; // tslint:disable-line:boolean-trivia
        },
        // walker(path: string) {
        //     return new Walker(path);
        // },
        get(path: string): any {
            const node = getNode(path, false); // tslint:disable-line:boolean-trivia
            return node && node.val;
        },
        has(path: string) {
            return !!getNode(path, false); // tslint:disable-line:boolean-trivia
        },
        getDir(path: string) {
            const dir = getNode(path, false); // tslint:disable-line:boolean-trivia
            if (dir) {
                return dir.getChildren();
            }
            return [];
        },
        filter(cb: Function) {
            return cb = NULL, [];
        },
        map<K>(cb: (val: any) => K) {
            const result: K[] = [];
            root.getChildren().forEach(recurse, root);
            return result;
            function recurse(this: NodeItem, name: string) {
                const node = this.getChild(name);
                if (node.isLeaf()) {
                    result.push(cb(node.val));
                }
                else {
                    node.getChildren().forEach(recurse, node);
                }
            }
        },
        resolve(module: string, containingFile: string) {
            if (module[0] !== "." && module[0] !== "/") {
                return nodeModule(module);
            }
            const fileName = basename(module);
            const extension = extname(fileName);
            const folder = dirname(containingFile);
            if (fastExtensions[extension] || (matchers && matchers.find(match, extension))) {
                return {
                    extension,
                    isExternalLibraryImport: false,
                    packageId: undefined,
                    resolvedFileName: resolve(folder, module)
                };
            }
            let nodeItem = getNode(folder, false); // tslint:disable-line:boolean-trivia
            if (!nodeItem) {
                throw new Error("Could not find path " + containingFile);
            }
            const arr = module.split("/");
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < arr.length; i++) {
                const cur = arr[i];
                if (cur === "..") {
                    nodeItem = nodeItem.getParent();
                }
                else if (!cur) {
                    let tempNode = nodeItem.getChild("index.ts");
                    if (!tempNode) {
                        tempNode = nodeItem.getChild("index.d.ts");
                    }
                    if (!tempNode) {
                        throw new Error("Could not resolve: \"" + module + "\" from \"" + containingFile + "\".");
                    }
                    nodeItem = tempNode;
                }
                else if (cur !== ".") {
                    let tempNode = nodeItem.getChild(cur);
                    if (!tempNode) {
                        tempNode = nodeItem.getChild(cur + ".ts");
                    }
                    if (!tempNode) {
                        tempNode = nodeItem.getChild(cur + ".d.ts");
                    }
                    if (!tempNode) {
                        throw new Error("Could not resolve: \"" + module + "\" from \"" + containingFile + "\".");
                    }
                    nodeItem = tempNode;
                }
            }
            return {
                extension: ".ts",
                isExternalLibraryImport: false,
                packageId: undefined,
                resolvedFileName: nodeItem.isLeaf() ? nodeItem.fullPath() : nodeItem.getChild("index.ts").fullPath()
            };



        },
        delete(path: string) {
            const node = getNode(path, false); // tslint:disable-line:boolean-trivia
            return node && node.remove();
        },
        resolveFrom(extensions: string[]) {
            exts = exts ? exts.concat(extensions) : extensions.slice();
        },
        knowExtensions(exts: RegExp[]) {
            matchers = matchers ? matchers.concat(exts) : exts.slice();
        }
    };
    // KEEP IN SYNC!!

    // class Walker {
    //     private _node: NodeItem;
    //     constructor(path: string) {
    //         this._node = getNode(path, false); // tslint:disable-line:boolean-trivia
    //     }
    //     isValid() {
    //         return !!this._node;
    //     }
    //     getChildrenNames() {
    //         return this._node.getChildren() || [];
    //     }
    //     getChild(name: string) {
    //         this._node = this._node.getChild(name);
    //         return this;
    //     }
    //     setChild(name: string, val: any) {
    //         const child = this._node.getChild(name) || this._node.createChild(name);
    //         child.val = val;
    //         return this;
    //     }
    //     getParent() {
    //         if (this._node) {
    //             this._node = this._node.getParent();
    //         }
    //         return this;
    //     }
    //     getValue() {
    //         return this._node.val;
    //     }
    // }
    return service;
    function nodeModule(module: string) {
        return {
            extension: ".js",
            isExternalLibraryImport: true,
            packageId: {} as any,
            resolvedFileName: fakeNodeModules + module + "/index.js"
        };
    }
    function match(this: string, reg: RegExp) {
        return reg.test(this);
    }

    // tslint:disable-next-line:variable-name
    function getNode(path_: string, create: boolean): NodeItem {
        const p = normalize(path_);
        let node = root;
        const collected = [];
        let name: string;
        for (let i = 0, cur = p[i], l = p.length; i < l; cur = p[++i]) {
            if (cur === sep) {
                name = collected.join("");
                const temp = node.getChild(name);
                if (temp) {
                    node = temp;
                }
                else {
                    if (create) {
                        node = node.createChild(name);
                    }
                    else {
                        return NULL;
                    }
                }
                collected.length = 0;
            }
            else {
                collected.push(cur);
            }
        }
        const temp = node.getChild(name = collected.join(""));
        if (temp) {
            node = temp;
        }
        else {
            if (create) {
                node = node.createChild(name);
            }
            else {
                return NULL;
            }
        }
        return node;
    }
})();