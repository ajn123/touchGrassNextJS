import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}