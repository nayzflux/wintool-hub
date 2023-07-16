"use client"

import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "@/lib/api";
import {useToast} from "@/components/ui/use-toast";
import useAuthModal from "@/hooks/useAuthModal";

const formSchema = z.object({
    email: z.string().nonempty().email().min(3).max(100),
    password: z.string().nonempty().min(8)
});


const SignInForm = () => {
    const toast = useToast();
    const {close} = useAuthModal();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        signIn(values.email, values.password)
            .then(authReponse => {
                toast.toast({
                    title: "Logged In!",
                    description: "You're now logged as " + authReponse.record.name
                })

                close()
            }).catch((err) => {
            console.log(err.data)
            toast.toast({
                title: "Something went wrong!",
                description: "Unable to login",
                variant: "destructive"
            });

            const fields = ["email", "password"];

            for (const field of fields) {
                if (field !== "email" && field !== "password") return;

                const message = err?.data?.data?.[field]?.message;

                if (message) {
                    form.setError(field, {type: 'validate', message})
                }
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input  type="password" placeholder="*****************" {...field} />
                            </FormControl>
                            <FormDescription>
                                Must contains : 8 chars / 2 numbers / 2 specials chars
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </Form>
    );
};

export default SignInForm;