import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon, ShopLogoIcon } from "@/components/icons";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/features/store";
import { showToastMessage } from "@/features/common/uiSlice";
import { loginWithEmail } from "@/features/user/userSlice";
import { Eye, EyeOff } from "lucide-react";
const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector<RootState, RootState["user"]>(
    (state) => state.user,
  );
  const token = localStorage.getItem("accessToken");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }
    // else if (formData.password.length < 8) {
    //   newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    // }
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
  useEffect(() => {
    if (user || token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
      {/* 로그인 박스 */}
      <div className="flex-1 flex flex-col my-auto space-y-8 md:space-y-12 w-full max-w-lg py-8 md:py-0 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <ShopLogoIcon size={80} />
          <h1 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
            SHOPMINIMAL ACCOUNT
          </h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
          <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
            <Field>
              <FieldLabel className="text-xs sm:text-sm tracking-[0.2em] font-medium">
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

                {errors.email && (
                  <span className="text-xs text-destructive">
                    {errors.email}
                  </span>
                )}
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel className="text-xs sm:text-sm tracking-[0.2em] font-medium">
                PASSWORD
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    variant="ghost"
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {showPassword ? (
                    <Eye
                      className={`size-6 text-gray-400 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 `}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeOff
                      className={`size-6 text-gray-400 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 `}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                {errors.password && (
                  <span className="text-xs text-destructive">
                    {errors.password}
                  </span>
                )}
              </FieldContent>
            </Field>
          </div>
          <div className="space-y-2">
            <Button
              variant="default"
              size="lg"
              type="submit"
              className="w-full py-6 md:py-8 cursor-pointer"
            >
              SIGN IN
            </Button>
            <Button
              variant="outline"
              size="lg"
              type="submit"
              className="w-full py-6 md:py-8"
            >
              <GoogleIcon />
              CONTINUE WITH GOOGLE
            </Button>
            <OrSeparator>
              <span className="bg-white dark:bg-background-dark px-4 text-slate-400">
                CONTINUE WITH
              </span>
            </OrSeparator>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full py-6 md:py-8"
            >
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
