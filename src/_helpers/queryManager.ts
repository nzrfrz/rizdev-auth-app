// @ts-ignore
import { Model, Document } from "mongoose";

export interface AnyDocument extends Document {};
type Collection<T extends AnyDocument> = Model<T>;

export const saveNewDocument = async (data: Record<string, any>) => {
    return await data.save();
};

export const getAllDocument = async <T extends AnyDocument>(
    collection: Collection<T>, 
    args: {}
    ): Promise<T[]> => {
    return await collection.find(args).lean();
};

export const findDocByID = async <T extends AnyDocument>(
    collection: Collection<T>, 
    id: string
    ): Promise<T> => {
    return await collection.findById(id).lean();
};

export const findOneDocument = async <T extends AnyDocument>(
    collection: Collection<T>, 
    args: {}
    ): Promise<T> => {
    return await collection.findOne(args);
};

export const updateByID = async <T extends AnyDocument>(
    collection: Collection<T>, 
    id: string, 
    data: {}
    ): Promise<T> => {
    return await collection.findByIdAndUpdate(id, data, {new: true});
};

export const updateByCustomFilter = async <T extends AnyDocument>(
    collection: Collection<T>, 
    filter: {}, 
    data: {}
    ): Promise<{}> => {
    return await collection.findOneAndUpdate(filter, data, {new: true});
};

export const deleteByID = async <T extends AnyDocument>(
    collection: Collection<T>, 
    id: string
    ): Promise<T> => {
    return await collection.findByIdAndDelete(id);
};

export const deleteAll = async <T extends AnyDocument>(collection: Collection<T>): Promise<{}> => {
    return await collection.deleteMany();
};

export const bulkCreate = async <T extends AnyDocument>(
    collection: Collection<T>, 
    data: T
    ): Promise<T> => {
    return await collection.create(data);
};

export const listPaginatedSearch = async <T extends AnyDocument>(
    collection: Collection<T>, 
    args: {}, 
    limit: number, 
    page: number, 
    per_page: number
    ): Promise<T[]> => {
    return await collection.find(args).sort({ _id: -1 }).limit(limit).skip(page * per_page).lean();
};