import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-glass bg-card/80 border-b border-border/50 shadow-lg shadow-purple-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200"
            >
              {/* Logo Image Container */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-2 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-200">
                <Image
                  src="/techdigestlogo.png" // Add your logo here
                  alt="Blog Project Logo"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Logo Text */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Tech
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ml-1">
                  Digest
                </span>
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden sm:flex items-center gap-6">
              <Link
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group"
                href="/"
              >
                Home
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </Link>
              <Link
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group"
                href="/about"
              >
                About
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </Link>
              <Link
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group"
                href="/dashboard"
              >
                Dashboard
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </Link>
            </div>
            {user && (
              <Link
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group"
              href="/profile"
            >
              Profile
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          )}
          </div>
         

          {/* User Actions */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* User Profile */}
              <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 border border-border/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  {user.given_name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {user.given_name}
                </span>
              </div>

              {/* Mobile user indicator */}
              <div className="sm:hidden w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground text-sm font-semibold">
                {user.given_name?.charAt(0).toUpperCase()}
              </div>

              {/* Logout Button */}
              <LogoutLink
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "bg-card/50 border-border/50 hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-all duration-200",
                })}
              >
                Logout
              </LogoutLink>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Login Button */}
              <LoginLink
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200",
                })}
              >
                Login
              </LoginLink>

              {/* Sign Up Button */}
              <RegisterLink
                className={buttonVariants({
                  className:
                    "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 hover:scale-105",
                })}
              >
                Sign Up
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
