/* istanbul ignore file */
class Frame {
    public toBuffer(): Buffer {
        return Buffer.alloc(0);
    }

    public static fromBuffer(buffer: Buffer): Frame {
        return new Frame();
    }
}

export default Frame;