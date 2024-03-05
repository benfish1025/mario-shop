import { FormField } from "./FormField"
import { useForm } from "react-hook-form"
import * as yup from "yup"

interface CheckoutFormProps {
  submit?: () => Promise<void>
}

const validationSchema = yup.object().shape({
  name: yup.string().required("必填"),
  id: yup
    .string()
    .required("必填")
    .matches(
      /^\d{8}$/,
      "账号ID是8位数字"
    ),
  payCode: yup
    .string()
    .required("必填")
    .matches(/^\d\d\d\d$/, "支付密码密码是4位数字"),
})

export const CheckoutForm = ({
  submit = async () => {},
}: CheckoutFormProps) => {
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
    validationSchema,
  })

  return (
    <form data-testid="checkout-form" onSubmit={handleSubmit(submit)}>
      <FormField
        placeholder="宫本聪"
        type="text"
        name="name"
        label="姓名"
        inputRef={register}
        errors={errors.name}
      />
      <FormField
        placeholder="00000000"
        type="tel"
        inputMode="numeric"
        name="id"
        label="账号ID"
        inputRef={register}
        errors={errors.id}
      />
      <FormField
        placeholder="0000"
        type="tel"
        inputMode="numeric"
        name="payCode"
        label="支付密码"
        inputRef={register}
        errors={errors.payCode}
      />
      <button className="nes-btn is-primary">支付</button>
    </form>
  )
}
