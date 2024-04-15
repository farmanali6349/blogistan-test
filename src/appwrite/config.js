import { Client, Databases, Storage, ID, Query } from 'appwrite'
import conf from '../conf/conf'


class DatabaseService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, featuredImageSource, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, featuredImageSource, status, userId }
            )
        } catch (error) {
            console.log("Appwrite DatabaseService :: createPost() :: Error", error)
        }
    }

    async updatePost({ title, slug, content, featuredImage, featuredImageSource, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, featuredImageSource, status }
            )
        } catch (error) {
            console.log("Appwrite DatabaseService :: updatePost() :: Error", error)
        }
    }


    async updatePost({ title, slug, content, featuredImage, featuredImageSource, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, featuredImageSource, status }
            )
        } catch (error) {
            console.log("Appwrite DatabaseService :: updatePost() :: Error", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true;
        } catch (error) {
            console.log("Appwrite DatabaseService :: deletePost() :: Error", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite DatabaseService :: getPost() :: Error", error)
            return false;
        }
    }

    async getPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query
            )
        } catch (error) {
            console.log("Appwrite DatabaseService :: getPosts() :: Error", error)
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite DatabaseService :: uploadFile() :: Error", error)
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite DatabaseService :: uploadFile() :: Error", error)
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true;

        } catch (error) {
            console.log("Appwrite DatabaseService :: uploadFile() :: Error", error)
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }


}

const databaseService = new DatabaseService();

export default databaseService;