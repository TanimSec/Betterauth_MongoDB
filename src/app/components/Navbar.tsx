"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";


import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/src/lib/auth-client";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const navLinks = [
        { label: "Features", href: "#features" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pricing", href: "#pricing" },
    ];

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="font-bold text-inherit">
                            ACME
                        </Link>
                    </div>
                </div>

                {/* Desktop navigation */}
                <ul className="hidden items-center gap-6 md:flex">
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href} className="text-sm">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth Section */}
                <div className="hidden items-center gap-4 md:flex">
                    {isPending ? (
                        <span className="text-xs text-muted">Loading...</span>
                    ) : session?.user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">
                                {session.user.name || session.user.email}
                            </span>
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/sign-in" className="text-sm">
                                Login
                            </Link>
                            <Link href="/sign-up">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile drawer */}
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="block py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li className="mt-4 flex flex-col gap-3 border-t border-separator pt-4">
                            {isPending ? (
                                <span className="text-xs text-muted">Loading...</span>
                            ) : session?.user ? (
                                <>
                                    <span className="text-sm font-medium text-foreground">
                                        Signed in as {session.user.name || session.user.email}
                                    </span>
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                        onClick={async () => {
                                            setIsMenuOpen(false);
                                            await handleSignOut();
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/sign-in"
                                        className="block py-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/sign-up"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Button className="w-full">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}