import multer from 'multer';

const parser = multer({ storage: multer.memoryStorage() });

export default parser;