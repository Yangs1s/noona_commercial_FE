import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShopLogoIcon } from "@/components/icons";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import { Activity } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/features/store";
import { registerUser } from "@/features/user/userSlice";

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    address: "",
    phone: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // const { loading, registrationError } = useSelector<RootState>(
  //   (state) => state.user,
  // );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    // if (formData.password.length < 8)
    //   newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    if (formData.name.length < 1)
      newErrors.name = "이름은 1자 이상이어야 합니다.";
    if (formData.address.length < 1)
      newErrors.address = "주소는 1자 이상이어야 합니다.";
    if (formData.phone.length < 1)
      newErrors.phone = "전화번호는 1자 이상이어야 합니다.";
    if (!formData.passwordConfirm)
      newErrors.passwordConfirm = "비밀번호를 입력해주세요.";
    else if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    if (!formData.terms) newErrors.terms = "이용약관에 동의해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          navigate: navigate,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
      <div className="flex-1 flex flex-col my-auto space-y-8 md:space-y-12 w-full max-w-lg py-8 md:py-0 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <ShopLogoIcon size={80} />
          <h1 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
            SHOPMINIMAL ACCOUNT
          </h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
          <FieldGroup>
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-xs tracking-[0.2em] font-semibold"
              >
                EMAIL
              </FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  name="email"
                  variant="ghost"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FieldContent>
              <Activity mode={errors.email ? "visible" : "hidden"}>
                <span className="text-xs text-destructive">{errors.email}</span>
              </Activity>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="name"
                className="text-xs tracking-[0.2em] font-semibold"
              >
                NAME
              </FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  name="name"
                  variant="ghost"
                  placeholder="이름을 입력해주세요"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FieldContent>
              <Activity mode={errors.name ? "visible" : "hidden"}>
                <span className="text-xs text-destructive">{errors.name}</span>
              </Activity>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-xs tracking-[0.2em] font-semibold"
              >
                PASSWORD
              </FieldLabel>
              <FieldContent>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="ghost"
                  placeholder="비밀번호를 입력해주세요"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FieldContent>
              <Activity mode={errors.password ? "visible" : "hidden"}>
                <span className="text-xs text-destructive">
                  {errors.password}
                </span>
              </Activity>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="passwordConfirm"
                className="text-xs tracking-[0.2em] font-semibold"
              >
                PASSWORD CONFIRM
              </FieldLabel>
              <FieldContent>
                <Input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  variant="ghost"
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </FieldContent>
              <Activity mode={errors.passwordConfirm ? "visible" : "hidden"}>
                <span className="text-xs text-destructive">
                  {errors.passwordConfirm}
                </span>
              </Activity>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="address"
                className="text-xs tracking-[0.2em] font-semibold"
              >
                ADDRESS
              </FieldLabel>
              <FieldContent>
                <Input
                  id="address"
                  name="address"
                  variant="ghost"
                  placeholder="주소를 입력해주세요"
                  value={formData.address}
                  onChange={handleChange}
                />
              </FieldContent>
              <Activity mode={errors.address ? "visible" : "hidden"}>
                <span className="text-xs text-destructive">
                  {errors.address}
                </span>
              </Activity>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="phone"
                className="text-xs tracking-[0.2em] font-semibold"
              >
                CONTACT
              </FieldLabel>
              <FieldContent>
                <Input
                  id="phone"
                  name="phone"
                  variant="ghost"
                  placeholder="전화번호를 입력해주세요"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FieldContent>
              <Activity mode={errors.phone ? "visible" : "hidden"}>
                <span className="text-xs text-destructive">{errors.phone}</span>
              </Activity>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox"
                name="terms"
                checked={formData.terms}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, terms: !!checked }))
                }
              />
              <FieldLabel
                htmlFor="terms-checkbox"
                className="text-xs tracking-[0.2em] font-semibold"
              >
                이용약관에 동의합니다.
              </FieldLabel>
            </Field>
            <Activity mode={errors.terms ? "visible" : "hidden"}>
              <span className="text-xs text-destructive">{errors.terms}</span>
            </Activity>
          </FieldGroup>

          <div className="space-y-2">
            <Button
              variant="outline"
              size="lg"
              type="submit"
              className="w-full py-6 md:py-8 cursor-pointer"
            >
              CREATE ACCOUNT
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="flex items-center justify-center gap-2">
            이미 계정이 있으신가요?
            <span className="text-primary underline">로그인하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
