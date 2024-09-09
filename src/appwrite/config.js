import confi from "../confi/confi";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(confi.appwriteURL)
        .setProject(confi.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImgae, status, userId}){
        try {
            return await this.databases.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImgae,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite server :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImgae, status}){
        try {
            return await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImgae,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite server :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
            return true
        } 
        catch (error) {
            console.log("Appwrite server :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite server :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queires = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                queires
            )
        } catch (error) {
            console.log("Appwrite server :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confi.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite server :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                confi.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite server :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            confi.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service()
export default service