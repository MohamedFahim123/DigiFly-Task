import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "@/app/utils/baseUrl";
import { fetchUsers } from "./usersSlice";
import { toast } from "react-toastify";

interface FormState {
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  FirstName: "",
  LastName: "",
  Phone: "",
  Email: "",
  loading: false,
  error: null,
};

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formData: FormState, { dispatch }) => {
    const toastId = toast.loading("Submitting...");
    try {
      const response = await fetch(`${baseUrl}/user-informations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast.dismiss(toastId);
      toast.success("User Added Successfully!", {
        autoClose: 1500,
      });
      const result = await response.json();
      dispatch(reset());
      dispatch(fetchUsers());
      return result;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed To Add User!", {
        autoClose: 1500,
      });
      throw new Error(error instanceof Error ? error.message : "Failed To Add User!");
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.FirstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.LastName = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.Phone = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.Email = action.payload;
    },
    reset: (state) => {
      state.FirstName = "";
      state.LastName = "";
      state.Phone = "";
      state.Email = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setFirstName, setLastName, setPhone, setEmail, reset } =
  formSlice.actions;
export default formSlice.reducer;
