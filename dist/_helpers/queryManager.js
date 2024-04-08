"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPaginatedSearch = exports.bulkCreate = exports.deleteAll = exports.deleteByID = exports.updateByCustomFilter = exports.updateByID = exports.findOneDocument = exports.findDocByID = exports.getAllDocument = exports.saveNewDocument = void 0;
;
const saveNewDocument = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data.save();
});
exports.saveNewDocument = saveNewDocument;
const getAllDocument = (collection, args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.find(args).lean();
});
exports.getAllDocument = getAllDocument;
const findDocByID = (collection, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.findById(id).lean();
});
exports.findDocByID = findDocByID;
const findOneDocument = (collection, args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.findOne(args);
});
exports.findOneDocument = findOneDocument;
const updateByID = (collection, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.findByIdAndUpdate(id, data, { new: true });
});
exports.updateByID = updateByID;
const updateByCustomFilter = (collection, filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.findOneAndUpdate(filter, data, { new: true });
});
exports.updateByCustomFilter = updateByCustomFilter;
const deleteByID = (collection, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.findByIdAndDelete(id);
});
exports.deleteByID = deleteByID;
const deleteAll = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.deleteMany();
});
exports.deleteAll = deleteAll;
const bulkCreate = (collection, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.create(data);
});
exports.bulkCreate = bulkCreate;
const listPaginatedSearch = (collection, args, limit, page, per_page) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.find(args).sort({ _id: -1 }).limit(limit).skip(page * per_page).lean();
});
exports.listPaginatedSearch = listPaginatedSearch;
//# sourceMappingURL=queryManager.js.map