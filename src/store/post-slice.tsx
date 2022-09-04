import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../components/types";
import { setStorage } from "../utils/storageUtil";

type StatusType = "pending" | "completed" | "fail";

export interface InitialType {
  initialPosts: PostType[];
  filteredPosts: PostType[];
  status: StatusType;
}

const initialState: InitialType = {
  status: "" as StatusType,
  initialPosts: [],
  filteredPosts: [],
};

export const getPost = createAsyncThunk(`postSlice/getPost`, async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const responseData = await response.json();
  return responseData;
});

// export const getPost = asyncThunk("postSlice/getPost");
// export const postPost = asyncThunk("postSlice/postPost");

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    search(state, action: PayloadAction<PostType[]>) {
      state.filteredPosts = action.payload;
    },

    setPost(state, action: PayloadAction<InitialType>) {
      state.status = action.payload.status;
      state.filteredPosts = action.payload.filteredPosts;
      state.initialPosts = action.payload.initialPosts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.status = "completed";
      state.initialPosts = action.payload;
      state.filteredPosts = action.payload;
      setStorage("post", state);
    });
    builder.addCase(getPost.rejected, (state) => {
      state.status = "fail";
    });
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
