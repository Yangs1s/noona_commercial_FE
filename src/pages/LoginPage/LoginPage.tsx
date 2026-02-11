import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon, ShopLogoIcon } from "@/components/icons";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Activity } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/features/store";
import { showToastMessage } from "@/features/common/uiSlice";
import { loginWithEmail } from "@/features/user/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    if (formData.password.length < 8)
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      dispatch(
        loginWithEmail({
          email: formData.email,
          password: formData.password,
          navigate: navigate,
        }),
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showToastMessage({
          message: "아이디 혹은 비밀번호가 일치하지 않습니다.",
          status: "error",
        }),
      );
    }
  };

  // if (user) {
  //   navigate("/");
  // }

  return (
    <div className="flex-1 flex items-center justify-center">
      {/* 로그인 박스 */}
      <div className="flex-1 flex flex-col my-auto space-y-12 w-full max-w-lg  p-4 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <ShopLogoIcon size={100} />
          <h1 className="text-sm font-bold tracking-[0.2em] uppercase">
            SHOPMINIMAL ACCOUNT
          </h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-8 mb-12">
            <Field>
              <FieldLabel className="text-sm tracking-[0.2em] font-medium">
                EMAIL
              </FieldLabel>
              <FieldContent>
                <Input
                  name="email"
                  variant="ghost"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-sm tracking-[0.2em] font-medium">
                PASSWORD
              </FieldLabel>
              <FieldContent>
                <Input
                  name="password"
                  type="password"
                  variant="ghost"
                  placeholder="비밀번호를 입력해주세요"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FieldContent>
            </Field>
          </div>
          <Activity mode={errors.email ? "visible" : "hidden"}>
            <span className="text-xs text-destructive">{errors.email}</span>
          </Activity>
          <div className="space-y-2">
            <Button
              variant="default"
              size="lg"
              type="submit"
              className="w-full py-8 "
            >
              SIGN IN
            </Button>
            <Button
              variant="outline"
              size="lg"
              type="submit"
              className="w-full py-8 "
            >
              <GoogleIcon />
              CONTINUE WITH GOOGLE
            </Button>
            <OrSeparator>
              <span className="bg-white dark:bg-background-dark px-4 text-slate-400">
                CONTINUE WITH
              </span>
            </OrSeparator>
            <Button asChild variant="outline" size="lg" className="w-full py-8">
              <Link to="/signup">CREATE ACCOUNT</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

const OrSeparator = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-ui-border dark:border-slate-800"></div>
      </div>
      <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
        {children}
      </div>
    </div>
  );
};
