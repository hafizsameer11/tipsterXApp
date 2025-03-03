import { API_ENDPOINTS } from '../apiConfig';
import { apiCall, ApiResponse } from '../customApiCall';

export const fetchAllPosts = async (token: string) : Promise<ApiResponseType> => {
    // const data = { token: token }
    return await apiCall(API_ENDPOINTS.Post.GetPosts, 'GET', undefined, token);
};


export const LikePost = async (PostId :number , token: string) => {
    // const data = { token: token }
    return await apiCall(API_ENDPOINTS.Post.GetLikes + "/" + PostId , 'GET', undefined, token);
};


interface ApiResponseType {
    data: {
        comments_count: number;
        content: string;
        id: number;
        image_1: string;
        image_2: string;
        image_3: string;
        images: string[];
        likes_count: number;
        recent_comments: any[];
        timestamp: string;
        user: {
            id: number;
            username: string;
            profile_picture:string
        };
    }[];
    message: string;
    status: string;
}