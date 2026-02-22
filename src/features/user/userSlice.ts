import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToastMessage } from "@/features/common/uiSlice";
import { api } from "@/utils/api";
import axios from "axios";
import type { User, RegisterPayload, LoginPayload } from "@/types/user.type";

interface UserState {
  user: User | null;
  loading: boolean;
  loginError: string | null;
  registrationError: string | null;
  success: boolean;
}

export const loginWithEmail = createAsyncThunk(
  "auth/loginwithMail",
  async ({ email, password }: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/auth/loginwithMail", {
        email,
        password,
      });
      if (response.status === 200) {
        dispatch(
          showToastMessage({ message: "로그인 성공", status: "success" }),
        );
        localStorage.setItem("accessToken", response.data.token);
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          showToastMessage({
            message: error.response?.data.error,
            status: "error",
          }),
        );
      }
      return rejectWithValue(error);
    }
  },
);

// export const loginWithGoogle = createAsyncThunk(
//   "user/loginWithGoogle",
//   async (token, { rejectWithValue }) => {},
// );

export const logout = createAsyncThunk(
  "user/logout",
  async (
    { navigate }: { navigate: (path: string) => void },
    { dispatch, rejectWithValue },
  ) => {
    try {
      localStorage.removeItem("accessToken");
      dispatch(
        showToastMessage({ message: "로그아웃 성공", status: "success" }),
      );
      navigate("/login");
      return null;
    } catch (error) {
      dispatch(showToastMessage({ message: "로그아웃 실패", status: "error" }));
      return rejectWithValue(error);
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/create",
  async (
    { email, name, password, address, phone, navigate }: RegisterPayload,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await api.post("/user/create", {
        email,
        name,
        password,
        address,
        phone,
      });
      dispatch(
        showToastMessage({ message: "회원가입 성공", status: "success" }),
      );
      navigate("/login");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(
          showToastMessage({
            message: error.response?.data.error,
            status: "error",
          }),
        );
      }
      return rejectWithValue(error);
    }
  },
);
// 토큰값으로 로그인
export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/me");
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: UserState = {
  user: null,
  loading: false,
  loginError: null,
  registrationError: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationError = action.payload as string;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginError = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload as string;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginWithToken.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loginError = null;
        state.registrationError = null;
      });
  },
});
export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
