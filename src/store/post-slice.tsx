import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialType {
  initialPosts: PostType[];
  filteredPosts: PostType[];
}

const initialState: InitialType = {
  initialPosts: [],
  filteredPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    search(state, action: PayloadAction<PostType[]>) {
      state.filteredPosts = action.payload;
    },

    setPost(state, action: PayloadAction<InitialType>) {
      state.filteredPosts = action.payload.filteredPosts;
      state.initialPosts = action.payload.initialPosts;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
