import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "../components/DataType";
type StatusType = "loading" | "complete" | "fail";

interface InitialType {
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
    search(state, action) {
      state.filteredPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.status = "complete";
      state.initialPosts = action.payload;
      state.filteredPosts = action.payload;
    });
    builder.addCase(getPost.rejected, (state) => {
      state.status = "fail";
    });
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
