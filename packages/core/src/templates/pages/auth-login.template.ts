import { renderAlert } from '../alert.template'

export interface LoginPageData {
  error?: string
  message?: string
  version?: string
  redirect?: string
}

export function renderLoginPage(data: LoginPageData, demoLoginActive: boolean = false): string {
  return `
    <!DOCTYPE html>
    <html lang="en" class="h-full">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login - Latvians of Darwin</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg">
      <script src="https://unpkg.com/htmx.org@2.0.3"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                error: '#ef4444'
              }
            }
          }
        }
      </script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .lod-logo .text-top {
          font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
          font-size: 38px;
          font-weight: 400;
          fill: #2C3E50;
          letter-spacing: 4px;
          text-transform: uppercase;
        }
        
        .lod-logo .text-bottom {
          font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
          font-size: 68px;
          font-weight: 700;
          fill: #A6192E;
          letter-spacing: 6px;
          text-transform: uppercase;
        }
        
        .lod-logo .accent-line {
          stroke: #A6192E;
          stroke-width: 3px;
          stroke-linecap: round;
        }
      </style>
    </head>
    <body class="h-full bg-zinc-50 text-zinc-900">
      <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <!-- Logo Section -->
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div class="mx-auto w-64 mb-6">
            <svg class="w-full h-auto lod-logo" viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g transform="translate(250, 110)" text-anchor="middle">
                <text x="0" y="-15" class="text-top">Latvians Of</text>
                <line x1="-60" y1="12" x2="60" y2="12" class="accent-line" opacity="0.3" />
                <text x="0" y="72" class="text-bottom">Darwin</text>
              </g>
            </svg>
          </div>
          <h2 class="mt-4 text-xl font-medium text-zinc-900">Welcome Back</h2>
          <p class="mt-2 text-sm text-zinc-500">Sign in to your account to continue</p>
        </div>

        <!-- Form Container -->
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white shadow-sm ring-1 ring-zinc-950/5 rounded-xl px-6 py-8 sm:px-10">
            <!-- Alerts -->
            ${data.error ? `<div class="mb-6">${renderAlert({ type: 'error', message: data.error })}</div>` : ''}
            ${data.message ? `<div class="mb-6">${renderAlert({ type: 'success', message: data.message })}</div>` : ''}

            <!-- Form Response (HTMX target) -->
            <div id="form-response" class="mb-6"></div>

            <!-- Form -->
            <form
              id="login-form"
              action="/auth/login/form${data.redirect ? `?redirect=${encodeURIComponent(data.redirect)}` : ''}"
              method="post"
              hx-post="/auth/login/form${data.redirect ? `?redirect=${encodeURIComponent(data.redirect)}` : ''}"
              hx-target="#form-response"
              hx-swap="innerHTML"
              class="space-y-6"
            >
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-zinc-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="w-full rounded-lg bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-800 transition-shadow"
                  placeholder="Enter your email"
                >
              </div>

              <!-- Password -->
              <div>
                <label for="password" class="block text-sm font-medium text-zinc-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="w-full rounded-lg bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-800 transition-shadow"
                  placeholder="Enter your password"
                >
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full rounded-lg bg-red-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition-colors shadow-sm"
              >
                Sign In
              </button>
            </form>

            <!-- Links -->
            <div class="mt-6 text-center">
              <p class="text-sm text-zinc-600">
                Don't have an account?
                <a href="/auth/register" class="font-semibold text-red-800 hover:text-red-700 transition-colors">Create one here</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      ${demoLoginActive ? `
      <script>
        // Demo Login Prefill Script
        (function() {
          'use strict';

          function prefillLoginForm() {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            if (emailInput && passwordInput) {
              emailInput.value = 'admin@sonicjs.com';
              passwordInput.value = 'sonicjs!';

              // Add visual indication that form is prefilled (only if not already present)
              const form = emailInput.closest('form');
              if (form && !form.querySelector('.demo-mode-notice')) {
                const notice = document.createElement('div');
                notice.className = 'demo-mode-notice mb-6 rounded-lg bg-blue-500/10 p-4 ring-1 ring-blue-500/20';
                notice.innerHTML = '<div class="flex items-start gap-x-3"><svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><h3 class="text-sm font-semibold text-blue-300">Demo Mode</h3><p class="mt-1 text-sm text-blue-400">Login form prefilled with demo credentials</p></div></div>';
                form.insertBefore(notice, form.firstChild);
              }
            }
          }

          // Prefill on page load
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', prefillLoginForm);
          } else {
            prefillLoginForm();
          }

          // Also handle HTMX page changes (for SPA-like navigation)
          document.addEventListener('htmx:afterSwap', function(event) {
            if (event.detail.target.id === 'main-content' ||
                document.getElementById('email')) {
              setTimeout(prefillLoginForm, 100);
            }
          });
        })();
      </script>
      ` : ''}
    </body>
    </html>
  `
}