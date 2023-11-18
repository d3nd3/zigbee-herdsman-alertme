/// <reference types="node" />
/// <reference types="node" />
import * as stream from 'stream';
export declare class Parser extends stream.Transform {
    private buffer;
    constructor();
    _transform(chunk: Buffer, _: string, cb: () => void): void;
    private parseNext;
    private extractFrame;
    private unstuff;
    reset(): void;
}
//# sourceMappingURL=parser.d.ts.map