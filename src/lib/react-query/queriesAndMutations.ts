import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query'
import { GetPostById, LikePost, createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getRecentPosts, savePost, signInAccount, signOutAccount, updatePost } from '../appwrite/api'
import { INewPost, INewUser, IUpdatePost } from '@/types'
import { create } from 'domain';
import { QUERY_KEYS } from './queryKeys';
import { get } from 'http';




export const useCreateUserAccount = () => {

    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    });
}


export const useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user),
    });
  };



  export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount
    });
  };



  export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };


  export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    });
  }


  export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({postId, likesArray}: {postId: string; likesArray:
        string[] }) => LikePost(postId, likesArray),
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS]
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER]
          })
        }
      })
    
  }


  export const useSavePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({postId, userId}: {postId: string; userId:
        string }) => savePost(postId, userId),
        onSuccess: () => {
          
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS]
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER]
          })
        }
      })
    
  }


  export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
        onSuccess: () => {
          
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS]
          })
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER]
          })
        }
      })
    
  }

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser
  })




}

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => GetPostById(postId),
    enabled: !!postId
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
   
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
    }
  })
}
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
   
    mutationFn: ({postId, imageId }: {postId: string, imageId: string}) => deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}

