/*@internal*/
namespace TsAsync {
    // tslint:disable-next-line:class-name
    export interface ts {
        resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: ts.CompilerOptions, host: ts.ModuleResolutionHost): ts.ResolvedTypeReferenceDirectiveWithFailedLookupLocations;
        getDefaultLibFilePath(options: ts.CompilerOptions): string;
        parseConfigFileTextToJson(fileName: string, jsonText: string): {
            config?: any;
            error?: ts.Diagnostic;
        };
        parseJsonConfigFileContent(json: any, host: ts.ParseConfigHost, basePath: string, existingOptions?: ts.CompilerOptions, configFileName?: string, resolutionStack?: ts.Path[], extraFileExtensions?: ReadonlyArray<ts.FileExtensionInfo>): ts.ParsedCommandLine;
    }
    export namespace ts {
        export interface FileExtensionInfo {
            extension: string;
            isMixedContent: boolean;
            scriptKind?: ScriptKind;
        }
        export interface ParsedCommandLine {
            options: CompilerOptions;
            typeAcquisition?: TypeAcquisition;
            fileNames: string[];
            projectReferences?: ReadonlyArray<ProjectReference>;
            raw?: any;
            errors: Diagnostic[];
            wildcardDirectories?: MapLike<WatchDirectoryFlags>;
            compileOnSave?: boolean;
        }
        export enum WatchDirectoryFlags {
            None = 0,
            Recursive = 1
        }
        export interface TypeAcquisition {
            enableAutoDiscovery?: boolean;
            enable?: boolean;
            include?: string[];
            exclude?: string[];
            [option: string]: string[] | boolean | undefined;
        }
        export interface ParseConfigHost {
            useCaseSensitiveFileNames: boolean;
            readDirectory(rootDir: string, extensions: ReadonlyArray<string>, excludes: ReadonlyArray<string> | undefined, includes: ReadonlyArray<string>, depth?: number): string[];
            /**
             * Gets a value indicating whether the specified path exists and is a file.
             * @param path The path to test.
             */
            fileExists(path: string): boolean;
            readFile(path: string): string | undefined;
        }
        export interface DiagnosticMessageChain {
            messageText: string;
            category: DiagnosticCategory;
            code: number;
            next?: DiagnosticMessageChain;
        }
        export interface Diagnostic {
            file: SourceFile | undefined;
            start: number | undefined;
            length: number | undefined;
            messageText: string | DiagnosticMessageChain;
            category: DiagnosticCategory;
            /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
            reportsUnnecessary?: {};
            code: number;
            source?: string;
        }
        export enum DiagnosticCategory {
            Warning = 0,
            Error = 1,
            Suggestion = 2,
            Message = 3
        }
        export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
            readonly resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
            readonly failedLookupLocations: ReadonlyArray<string>;
        }
        export interface ModuleResolutionHost {
            fileExists(fileName: string): boolean;
            readFile(fileName: string): string | undefined;
            trace?(s: string): void;
            directoryExists?(directoryName: string): boolean;
            /**
             * Resolve a symbolic link.
             * @see https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options
             */
            realpath?(path: string): string;
            getCurrentDirectory?(): string;
            getDirectories?(path: string): string[];
        }
        export enum ModuleKind {
            None = 0,
            CommonJS = 1,
            AMD = 2,
            UMD = 3,
            System = 4,
            ES2015 = 5,
            ESNext = 6
        }
        export enum JsxEmit {
            None = 0,
            Preserve = 1,
            React = 2,
            ReactNative = 3
        }
        export enum NewLineKind {
            CarriageReturnLineFeed = 0,
            LineFeed = 1
        }
        export enum ModuleResolutionKind {
            Classic = 1,
            NodeJs = 2
        }
        export interface MapLike<T> {
            [index: string]: T;
        }
        export enum ScriptTarget {
            ES3 = 0,
            ES5 = 1,
            ES2015 = 2,
            ES2016 = 3,
            ES2017 = 4,
            ES2018 = 5,
            ESNext = 6,
            JSON = 100,
            Latest = 6
        }
        export type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | PluginImport[] | ProjectReference[] | null | undefined;
        export interface PluginImport {
            name: string;
        }
        export interface ProjectReference {
            /** A normalized path on disk */
            path: string;
            /** The path as the user originally wrote it */
            originalPath?: string;
            /** True if the output of this reference should be prepended to the output of this project. Only valid for --outFile compilations */
            prepend?: boolean;
            /** True if it is intended that this reference form a circularity */
            circular?: boolean;
        }
        export interface TsConfigSourceFile extends JsonSourceFile {
            extendedSourceFiles?: string[];
        }
        export interface JsonSourceFile extends SourceFile {
            statements: NodeArray<JsonObjectExpressionStatement>;
        }
        export interface ExpressionStatement extends Statement, JSDocContainer {
            kind: SyntaxKind.ExpressionStatement;
            expression: Expression;
        }
        export interface TextRange {
            pos: number;
            end: number;
        }
        export interface Expression extends Node {
            _expressionBrand: any;
        }
        export interface JSDocContainer {
        }

        export interface JsonObjectExpressionStatement extends ExpressionStatement {
            expression: Expression;
        }
        export interface Statement extends Node {
            _statementBrand: any;
        }
        export interface NodeArray<T extends Node> extends ReadonlyArray<T>, TextRange {
            hasTrailingComma?: boolean;
        }
        export enum NodeFlags {
            None = 0,
            Let = 1,
            Const = 2,
            NestedNamespace = 4,
            Synthesized = 8,
            Namespace = 16,
            ExportContext = 32,
            ContainsThis = 64,
            HasImplicitReturn = 128,
            HasExplicitReturn = 256,
            GlobalAugmentation = 512,
            HasAsyncFunctions = 1024,
            DisallowInContext = 2048,
            YieldContext = 4096,
            DecoratorContext = 8192,
            AwaitContext = 16384,
            ThisNodeHasError = 32768,
            JavaScriptFile = 65536,
            ThisNodeOrAnySubNodesHasError = 131072,
            HasAggregatedChildData = 262144,
            JSDoc = 2097152,
            JsonFile = 16777216,
            BlockScoped = 3,
            ReachabilityCheckFlags = 384,
            ReachabilityAndEmitFlags = 1408,
            ContextFlags = 12679168,
            TypeExcludesFlags = 20480
        }
        export interface Node extends TextRange {
            kind: SyntaxKind;
            flags: NodeFlags;
            decorators?: NodeArray<any>;
            modifiers?: ModifiersArray;
            parent: Node;
        }
        export interface Token<TKind extends SyntaxKind> extends Node {
            kind: TKind;
        }
        export type Modifier = Token<SyntaxKind.AbstractKeyword> | Token<SyntaxKind.AsyncKeyword> | Token<SyntaxKind.ConstKeyword> | Token<SyntaxKind.DeclareKeyword> | Token<SyntaxKind.DefaultKeyword> | Token<SyntaxKind.ExportKeyword> | Token<SyntaxKind.PublicKeyword> | Token<SyntaxKind.PrivateKeyword> | Token<SyntaxKind.ProtectedKeyword> | Token<SyntaxKind.ReadonlyKeyword> | Token<SyntaxKind.StaticKeyword>;
        export type ModifiersArray = NodeArray<Modifier>;
        export interface AmdDependency {
            path: string;
            name?: string;
        }
        export interface FileReference extends TextRange {
            fileName: string;
        }
        export interface SourceFile extends Declaration {
            kind: SyntaxKind.SourceFile;
            statements: NodeArray<Statement>;
            endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
            fileName: string;
            text: string;
            amdDependencies: ReadonlyArray<AmdDependency>;
            moduleName?: string;
            referencedFiles: ReadonlyArray<FileReference>;
            typeReferenceDirectives: ReadonlyArray<FileReference>;
            libReferenceDirectives: ReadonlyArray<FileReference>;
            languageVariant: LanguageVariant;
            isDeclarationFile: boolean;
            /**
             * lib.d.ts should have a reference comment like
             *
             *  /// <reference no-default-lib="true"/>
             *
             * If any other file has this comment, it signals not to include lib.d.ts
             * because this containing file is intended to act as a default library.
             */
            hasNoDefaultLib: boolean;
            languageVersion: ScriptTarget;
        }
        export enum LanguageVariant {
            Standard = 0,
            JSX = 1
        }
        export interface Declaration extends Node {
            _declarationBrand: any;
        }
        export enum SyntaxKind {
            Unknown = 0,
            EndOfFileToken = 1,
            SingleLineCommentTrivia = 2,
            MultiLineCommentTrivia = 3,
            NewLineTrivia = 4,
            WhitespaceTrivia = 5,
            ShebangTrivia = 6,
            ConflictMarkerTrivia = 7,
            NumericLiteral = 8,
            StringLiteral = 9,
            JsxText = 10,
            JsxTextAllWhiteSpaces = 11,
            RegularExpressionLiteral = 12,
            NoSubstitutionTemplateLiteral = 13,
            TemplateHead = 14,
            TemplateMiddle = 15,
            TemplateTail = 16,
            OpenBraceToken = 17,
            CloseBraceToken = 18,
            OpenParenToken = 19,
            CloseParenToken = 20,
            OpenBracketToken = 21,
            CloseBracketToken = 22,
            DotToken = 23,
            DotDotDotToken = 24,
            SemicolonToken = 25,
            CommaToken = 26,
            LessThanToken = 27,
            LessThanSlashToken = 28,
            GreaterThanToken = 29,
            LessThanEqualsToken = 30,
            GreaterThanEqualsToken = 31,
            EqualsEqualsToken = 32,
            ExclamationEqualsToken = 33,
            EqualsEqualsEqualsToken = 34,
            ExclamationEqualsEqualsToken = 35,
            EqualsGreaterThanToken = 36,
            PlusToken = 37,
            MinusToken = 38,
            AsteriskToken = 39,
            AsteriskAsteriskToken = 40,
            SlashToken = 41,
            PercentToken = 42,
            PlusPlusToken = 43,
            MinusMinusToken = 44,
            LessThanLessThanToken = 45,
            GreaterThanGreaterThanToken = 46,
            GreaterThanGreaterThanGreaterThanToken = 47,
            AmpersandToken = 48,
            BarToken = 49,
            CaretToken = 50,
            ExclamationToken = 51,
            TildeToken = 52,
            AmpersandAmpersandToken = 53,
            BarBarToken = 54,
            QuestionToken = 55,
            ColonToken = 56,
            AtToken = 57,
            EqualsToken = 58,
            PlusEqualsToken = 59,
            MinusEqualsToken = 60,
            AsteriskEqualsToken = 61,
            AsteriskAsteriskEqualsToken = 62,
            SlashEqualsToken = 63,
            PercentEqualsToken = 64,
            LessThanLessThanEqualsToken = 65,
            GreaterThanGreaterThanEqualsToken = 66,
            GreaterThanGreaterThanGreaterThanEqualsToken = 67,
            AmpersandEqualsToken = 68,
            BarEqualsToken = 69,
            CaretEqualsToken = 70,
            Identifier = 71,
            BreakKeyword = 72,
            CaseKeyword = 73,
            CatchKeyword = 74,
            ClassKeyword = 75,
            ConstKeyword = 76,
            ContinueKeyword = 77,
            DebuggerKeyword = 78,
            DefaultKeyword = 79,
            DeleteKeyword = 80,
            DoKeyword = 81,
            ElseKeyword = 82,
            EnumKeyword = 83,
            ExportKeyword = 84,
            ExtendsKeyword = 85,
            FalseKeyword = 86,
            FinallyKeyword = 87,
            ForKeyword = 88,
            FunctionKeyword = 89,
            IfKeyword = 90,
            ImportKeyword = 91,
            InKeyword = 92,
            InstanceOfKeyword = 93,
            NewKeyword = 94,
            NullKeyword = 95,
            ReturnKeyword = 96,
            SuperKeyword = 97,
            SwitchKeyword = 98,
            ThisKeyword = 99,
            ThrowKeyword = 100,
            TrueKeyword = 101,
            TryKeyword = 102,
            TypeOfKeyword = 103,
            VarKeyword = 104,
            VoidKeyword = 105,
            WhileKeyword = 106,
            WithKeyword = 107,
            ImplementsKeyword = 108,
            InterfaceKeyword = 109,
            LetKeyword = 110,
            PackageKeyword = 111,
            PrivateKeyword = 112,
            ProtectedKeyword = 113,
            PublicKeyword = 114,
            StaticKeyword = 115,
            YieldKeyword = 116,
            AbstractKeyword = 117,
            AsKeyword = 118,
            AnyKeyword = 119,
            AsyncKeyword = 120,
            AwaitKeyword = 121,
            BooleanKeyword = 122,
            ConstructorKeyword = 123,
            DeclareKeyword = 124,
            GetKeyword = 125,
            InferKeyword = 126,
            IsKeyword = 127,
            KeyOfKeyword = 128,
            ModuleKeyword = 129,
            NamespaceKeyword = 130,
            NeverKeyword = 131,
            ReadonlyKeyword = 132,
            RequireKeyword = 133,
            NumberKeyword = 134,
            ObjectKeyword = 135,
            SetKeyword = 136,
            StringKeyword = 137,
            SymbolKeyword = 138,
            TypeKeyword = 139,
            UndefinedKeyword = 140,
            UniqueKeyword = 141,
            UnknownKeyword = 142,
            FromKeyword = 143,
            GlobalKeyword = 144,
            OfKeyword = 145,
            QualifiedName = 146,
            ComputedPropertyName = 147,
            TypeParameter = 148,
            Parameter = 149,
            Decorator = 150,
            PropertySignature = 151,
            PropertyDeclaration = 152,
            MethodSignature = 153,
            MethodDeclaration = 154,
            Constructor = 155,
            GetAccessor = 156,
            SetAccessor = 157,
            CallSignature = 158,
            ConstructSignature = 159,
            IndexSignature = 160,
            TypePredicate = 161,
            TypeReference = 162,
            FunctionType = 163,
            ConstructorType = 164,
            TypeQuery = 165,
            TypeLiteral = 166,
            ArrayType = 167,
            TupleType = 168,
            UnionType = 169,
            IntersectionType = 170,
            ConditionalType = 171,
            InferType = 172,
            ParenthesizedType = 173,
            ThisType = 174,
            TypeOperator = 175,
            IndexedAccessType = 176,
            MappedType = 177,
            LiteralType = 178,
            ImportType = 179,
            ObjectBindingPattern = 180,
            ArrayBindingPattern = 181,
            BindingElement = 182,
            ArrayLiteralExpression = 183,
            ObjectLiteralExpression = 184,
            PropertyAccessExpression = 185,
            ElementAccessExpression = 186,
            CallExpression = 187,
            NewExpression = 188,
            TaggedTemplateExpression = 189,
            TypeAssertionExpression = 190,
            ParenthesizedExpression = 191,
            FunctionExpression = 192,
            ArrowFunction = 193,
            DeleteExpression = 194,
            TypeOfExpression = 195,
            VoidExpression = 196,
            AwaitExpression = 197,
            PrefixUnaryExpression = 198,
            PostfixUnaryExpression = 199,
            BinaryExpression = 200,
            ConditionalExpression = 201,
            TemplateExpression = 202,
            YieldExpression = 203,
            SpreadElement = 204,
            ClassExpression = 205,
            OmittedExpression = 206,
            ExpressionWithTypeArguments = 207,
            AsExpression = 208,
            NonNullExpression = 209,
            MetaProperty = 210,
            TemplateSpan = 211,
            SemicolonClassElement = 212,
            Block = 213,
            VariableStatement = 214,
            EmptyStatement = 215,
            ExpressionStatement = 216,
            IfStatement = 217,
            DoStatement = 218,
            WhileStatement = 219,
            ForStatement = 220,
            ForInStatement = 221,
            ForOfStatement = 222,
            ContinueStatement = 223,
            BreakStatement = 224,
            ReturnStatement = 225,
            WithStatement = 226,
            SwitchStatement = 227,
            LabeledStatement = 228,
            ThrowStatement = 229,
            TryStatement = 230,
            DebuggerStatement = 231,
            VariableDeclaration = 232,
            VariableDeclarationList = 233,
            FunctionDeclaration = 234,
            ClassDeclaration = 235,
            InterfaceDeclaration = 236,
            TypeAliasDeclaration = 237,
            EnumDeclaration = 238,
            ModuleDeclaration = 239,
            ModuleBlock = 240,
            CaseBlock = 241,
            NamespaceExportDeclaration = 242,
            ImportEqualsDeclaration = 243,
            ImportDeclaration = 244,
            ImportClause = 245,
            NamespaceImport = 246,
            NamedImports = 247,
            ImportSpecifier = 248,
            ExportAssignment = 249,
            ExportDeclaration = 250,
            NamedExports = 251,
            ExportSpecifier = 252,
            MissingDeclaration = 253,
            ExternalModuleReference = 254,
            JsxElement = 255,
            JsxSelfClosingElement = 256,
            JsxOpeningElement = 257,
            JsxClosingElement = 258,
            JsxFragment = 259,
            JsxOpeningFragment = 260,
            JsxClosingFragment = 261,
            JsxAttribute = 262,
            JsxAttributes = 263,
            JsxSpreadAttribute = 264,
            JsxExpression = 265,
            CaseClause = 266,
            DefaultClause = 267,
            HeritageClause = 268,
            CatchClause = 269,
            PropertyAssignment = 270,
            ShorthandPropertyAssignment = 271,
            SpreadAssignment = 272,
            EnumMember = 273,
            SourceFile = 274,
            Bundle = 275,
            UnparsedSource = 276,
            InputFiles = 277,
            JSDocTypeExpression = 278,
            JSDocAllType = 279,
            JSDocUnknownType = 280,
            JSDocNullableType = 281,
            JSDocNonNullableType = 282,
            JSDocOptionalType = 283,
            JSDocFunctionType = 284,
            JSDocVariadicType = 285,
            JSDocComment = 286,
            JSDocTypeLiteral = 287,
            JSDocSignature = 288,
            JSDocTag = 289,
            JSDocAugmentsTag = 290,
            JSDocClassTag = 291,
            JSDocCallbackTag = 292,
            JSDocParameterTag = 293,
            JSDocReturnTag = 294,
            JSDocTypeTag = 295,
            JSDocTemplateTag = 296,
            JSDocTypedefTag = 297,
            JSDocPropertyTag = 298,
            SyntaxList = 299,
            NotEmittedStatement = 300,
            PartiallyEmittedExpression = 301,
            CommaListExpression = 302,
            MergeDeclarationMarker = 303,
            EndOfDeclarationMarker = 304,
            Count = 305,
            FirstAssignment = 58,
            LastAssignment = 70,
            FirstCompoundAssignment = 59,
            LastCompoundAssignment = 70,
            FirstReservedWord = 72,
            LastReservedWord = 107,
            FirstKeyword = 72,
            LastKeyword = 145,
            FirstFutureReservedWord = 108,
            LastFutureReservedWord = 116,
            FirstTypeNode = 161,
            LastTypeNode = 179,
            FirstPunctuation = 17,
            LastPunctuation = 70,
            FirstToken = 0,
            LastToken = 145,
            FirstTriviaToken = 2,
            LastTriviaToken = 7,
            FirstLiteralToken = 8,
            LastLiteralToken = 13,
            FirstTemplateToken = 13,
            LastTemplateToken = 16,
            FirstBinaryOperator = 27,
            LastBinaryOperator = 70,
            FirstNode = 146,
            FirstJSDocNode = 278,
            LastJSDocNode = 298,
            FirstJSDocTagNode = 289,
            LastJSDocTagNode = 298
        }
        export interface CompilerOptions {
            allowJs?: boolean;
            allowSyntheticDefaultImports?: boolean;
            allowUnreachableCode?: boolean;
            allowUnusedLabels?: boolean;
            alwaysStrict?: boolean;
            baseUrl?: string;
            charset?: string;
            checkJs?: boolean;
            declaration?: boolean;
            declarationMap?: boolean;
            emitDeclarationOnly?: boolean;
            declarationDir?: string;
            disableSizeLimit?: boolean;
            downlevelIteration?: boolean;
            emitBOM?: boolean;
            emitDecoratorMetadata?: boolean;
            experimentalDecorators?: boolean;
            forceConsistentCasingInFileNames?: boolean;
            importHelpers?: boolean;
            inlineSourceMap?: boolean;
            inlineSources?: boolean;
            isolatedModules?: boolean;
            jsx?: JsxEmit;
            keyofStringsOnly?: boolean;
            lib?: string[];
            locale?: string;
            mapRoot?: string;
            maxNodeModuleJsDepth?: number;
            module?: ModuleKind;
            moduleResolution?: ModuleResolutionKind;
            newLine?: NewLineKind;
            noEmit?: boolean;
            noEmitHelpers?: boolean;
            noEmitOnError?: boolean;
            noErrorTruncation?: boolean;
            noFallthroughCasesInSwitch?: boolean;
            noImplicitAny?: boolean;
            noImplicitReturns?: boolean;
            noImplicitThis?: boolean;
            noStrictGenericChecks?: boolean;
            noUnusedLocals?: boolean;
            noUnusedParameters?: boolean;
            noImplicitUseStrict?: boolean;
            noLib?: boolean;
            noResolve?: boolean;
            out?: string;
            outDir?: string;
            outFile?: string;
            paths?: MapLike<string[]>;
            preserveConstEnums?: boolean;
            preserveSymlinks?: boolean;
            project?: string;
            reactNamespace?: string;
            jsxFactory?: string;
            composite?: boolean;
            removeComments?: boolean;
            rootDir?: string;
            rootDirs?: string[];
            skipLibCheck?: boolean;
            skipDefaultLibCheck?: boolean;
            sourceMap?: boolean;
            sourceRoot?: string;
            strict?: boolean;
            strictFunctionTypes?: boolean;
            strictNullChecks?: boolean;
            strictPropertyInitialization?: boolean;
            suppressExcessPropertyErrors?: boolean;
            suppressImplicitAnyIndexErrors?: boolean;
            target?: ScriptTarget;
            traceResolution?: boolean;
            resolveJsonModule?: boolean;
            types?: string[];
            /** Paths used to compute primary types search locations */
            typeRoots?: string[];
            esModuleInterop?: boolean;
            [option: string]: CompilerOptionsValue | TsConfigSourceFile | undefined;
        }
        export interface TextChangeRange {
            span: TextSpan;
            newLength: number;
        }
        export interface TextSpan {
            start: number;
            length: number;
        }
        export interface ScriptSnapshot {
            /** Gets a portion of the script snapshot specified by [start, end). */
            getText(start: number, end: number): string;
            /** Gets the length of this script snapshot. */
            getLength(): number;
            /**
             * Gets the TextChangeRange that describe how the text changed between this text and
             * an older version.  This information is used by the incremental parser to determine
             * what sections of the script need to be re-parsed.  'undefined' can be returned if the
             * change range cannot be determined.  However, in that case, incremental parsing will
             * not happen and the entire document will be re - parsed.
             */
            getChangeRange(oldSnapshot: ScriptSnapshot): TextChangeRange | undefined;
            /** Releases all resources held by this script snapshot */
            dispose?(): void;
        }
        export enum ScriptKind {
            Unknown = 0,
            JS = 1,
            JSX = 2,
            TS = 3,
            TSX = 4,
            External = 5,
            JSON = 6,
            /**
             * Used on extensions that doesn't define the ScriptKind but the content defines it.
             * Deferred extensions are going to be included in all project contexts.
             */
            Deferred = 7
        }
        export type Path = string & {
            __pathBrand: any;
        };
        export interface ResolvedTypeReferenceDirective {
            primary: boolean;
            resolvedFileName: string | undefined;
            packageId?: PackageId;
        }
        export interface PackageId {
            name: string;
            subModuleName: string;
            version: string;
        }
        export interface DocumentRegistry {
            /**
             * Request a stored SourceFile with a given fileName and compilationSettings.
             * The first call to acquire will call createLanguageServiceSourceFile to generate
             * the SourceFile if was not found in the registry.
             *
             * @param fileName The name of the file requested
             * @param compilationSettings Some compilation settings like target affects the
             * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
             * multiple copies of the same file for different compilation settings.
             * @param scriptSnapshot Text of the file. Only used if the file was not found
             * in the registry and a new one was created.
             * @param version Current version of the file. Only used if the file was not found
             * in the registry and a new one was created.
             */
            acquireDocument(fileName: string, compilationSettings: CompilerOptions, scriptSnapshot: ScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile;
            acquireDocumentWithKey(fileName: string, path: Path, compilationSettings: CompilerOptions, key: DocumentRegistryBucketKey, scriptSnapshot: ScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile;
            /**
             * Request an updated version of an already existing SourceFile with a given fileName
             * and compilationSettings. The update will in-turn call updateLanguageServiceSourceFile
             * to get an updated SourceFile.
             *
             * @param fileName The name of the file requested
             * @param compilationSettings Some compilation settings like target affects the
             * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
             * multiple copies of the same file for different compilation settings.
             * @param scriptSnapshot Text of the file.
             * @param version Current version of the file.
             */
            updateDocument(fileName: string, compilationSettings: CompilerOptions, scriptSnapshot: ScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile;
            updateDocumentWithKey(fileName: string, path: Path, compilationSettings: CompilerOptions, key: DocumentRegistryBucketKey, scriptSnapshot: ScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile;
            getKeyForCompilationSettings(settings: CompilerOptions): DocumentRegistryBucketKey;
            /**
             * Informs the DocumentRegistry that a file is not needed any longer.
             *
             * Note: It is not allowed to call release on a SourceFile that was not acquired from
             * this registry originally.
             *
             * @param fileName The name of the file to be released
             * @param compilationSettings The compilation settings used to acquire the file
             */
            releaseDocument(fileName: string, compilationSettings: CompilerOptions): void;
            releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey): void;
            reportStats(): string;
        }
        type DocumentRegistryBucketKey = string & {
            __bucketKey: any;
        };
    }
}