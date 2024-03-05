import { createClient } from '@supabase/supabase-js'


export const supabaseUrl = "https://pznbpgrngldecweoriod.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6bmJwZ3JuZ2xkZWN3ZW9yaW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNDg1ODYsImV4cCI6MjAyNDkyNDU4Nn0.LAHDShsfXdOXlyRlTDy7kvPMxAJdvOhOyuMjii5b_Lw";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getProducts = () => {
  return fetch(`${supabaseUrl}/storage/v1/object/public/mario-shop/products.json?${new Date().getTime()}`)
    .then((res) => {
      return res.json()
    })
    .catch(console.log)
}

export const getOrder = async (id: string): Promise<{ order: string }> => {
  let { data, error } = await supabase
    .from('orders')
    .select("*")
    .eq('id', id)

  if (error) {
    console.error(error);
    throw new Error("加载失败");
  }

  if (!data) return { order: "" }

  return data[0]
}

export interface CheckoutPayload {
  order: string
}

export const postCheckout = async ({ order }: CheckoutPayload) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      { order },
    ]).select()

  if (error) {
    console.error(error);
    throw new Error("加载失败");
  }

  if (!data) return {}

  return data[0]
}
