export const createFileStub = (): Express.Multer.File => ({
  fieldname: 'fieldname',
  originalname: 'originalname',
  encoding: 'encoding',
  mimetype: 'mimetype',
  size: 0,
  destination: 'destination',
  filename: 'filename',
  path: 'path',
  buffer: Buffer.from([]),
  stream: null
});
