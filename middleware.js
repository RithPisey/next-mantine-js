import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n } from "@/i18n.config";

function getLocale(request) {
	const negotiatorHeaders = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	const locales = i18n.locales;
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	const locale = matchLocale(languages, locales, i18n.defaultLocale);
	return locale;
}

export function middleware(request) {
	const locale = request.nextUrl.pathname.substring(1, 3);
	const pathname = request.nextUrl.pathname;
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);

	// Redirect if there is no locale
	const myRegex = /^\/.{2}$/;

	if (pathnameIsMissingLocale) {
		if (locale) {
			return NextResponse.redirect(
				new URL(
					`/${locale}${pathname === "/" ? "/dashboard" : pathname}`,
					request.url
				)
			);
		} else {
			return NextResponse.redirect(
				new URL(
					`/${i18n.defaultLocale}${pathname === "/" ? "/dashboard" : pathname}`,
					request.url
				)
			);
		}
	} else if (myRegex.test(pathname)) {
		return NextResponse.redirect(
			new URL(`/${locale}${"/dashboard"}`, request.url)
		);
	}
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
