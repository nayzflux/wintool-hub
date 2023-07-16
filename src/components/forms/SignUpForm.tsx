"use client"

import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUp} from "@/lib/api";
import {useToast} from "@/components/ui/use-toast";
import useAuthModal from "@/hooks/useAuthModal";

const formSchema = z.object({
    name: z.string().nonempty().min(1).max(100),
    username: z.string().nonempty().min(3).max(50),
    email: z.string().nonempty().email().min(3).max(100),
    password: z.string().nonempty().min(8),
    passwordConfirm: z.string().nonempty()
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
});



const SignUpForm = () => {
    const toast = useToast();
    const {close} = useAuthModal();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        signUp(values.email, values.password, values.username, values.name, values.passwordConfirm)
            .then(authReponse => {
                toast.toast({
                    title: "Logged In!",
                    description: "You're now logged as " + authReponse.record.name
                })

                close();
            }).catch((err) => {
                console.log(err.data)
                toast.toast({
                    title: "Something went wrong!",
                    description: "Unable to create user",
                    variant: "destructive"
                });

                const fields = ["email", "username", "password", "passwordConfirm", "name"];

                for (const field of fields) {
                    if (field !== "email" && field !== "username" && field !== "password" && field !== "passwordConfirm" && field !== "name") return;

                    const message = err?.data?.data?.[field]?.message;

                    if (message) {
                        form.setError(field, { type: 'validate', message})
                    }
                }

                /**
                // Email error handling
                if (err?.data?.data?.email) {
                    console.log(err.data.data.email?.message)
                    form.setError('email', { type: 'validate', message: err.data.data.email?.message})
                }

                // Username error handling
                if (err?.data?.data?.username) {
                    console.log(err.data.data.email?.username)
                    form.setError('username', { type: 'validate', message: err.data.data.username?.message})
                }

                // Name error handling
                if (err?.data?.data?.name) {
                    console.log(err.data.data.email?.name)
                    form.setError('name', { type: 'validate', message: err.data.data.name?.message})
                }

                // password error handling
                if (err?.data?.data?.password) {
                    console.log(err.data.data.password?.name)
                    form.setError('password', { type: 'validate', message: err.data.data.password?.message})
                }

                // Confirm password error handling
                if (err?.data?.data?.passwordConfirm) {
                    console.log(err.data.data.passwordConfirm?.name)
                    form.setError('confirmPassword', { type: 'validate', message: err.data.data.passwordConfirm?.message})
                }
                **/
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="john_27" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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

                <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password Confirm</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="*****************" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </Form>
    );
};

export default SignUpForm;