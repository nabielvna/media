'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

// Define type for form values based on the schema
type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Demo credentials
  const DEMO_CREDENTIALS = {
    email: 'joy@gmail.com',
    password: 'joy1234',
  } as const;

  const onSubmit = async (values: FormValues) => {
    setError('');
    setLoading(true);

    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        values.email === DEMO_CREDENTIALS.email &&
        values.password === DEMO_CREDENTIALS.password
      ) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(`An error occurred while signing in: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Please sign in to your account
          </CardDescription>
          <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Demo account:
              <br />
              Email: joy@gmail.com
              <br />
              Password: joy1234
            </p>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="space-y-4 text-center">
                <Link
                  href="/forgot-password"
                  className="block text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Forgot your password?
                </Link>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Do not have an account?{' '}
                  <Link
                    href="/register"
                    className="font-medium text-black dark:text-white hover:underline"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
