import { renderAlert } from '../alert.template'

export interface RegisterPageData {
  error?: string
}

export function renderRegisterPage(data: RegisterPageData): string {
  return `
    <!DOCTYPE html>
    <html lang="en" class="h-full">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Register - Latvians of Darwin</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg">
      <script src="https://unpkg.com/htmx.org@2.0.3"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {}
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
          <p class="text-sm text-zinc-500">Create your account and get started</p>
        </div>

        <!-- Form Container -->
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white shadow-sm ring-1 ring-zinc-950/5 rounded-xl px-6 py-8 sm:px-10">
            <!-- Alerts -->
            ${data.error ? `<div class="mb-6">${renderAlert({ type: 'error', message: data.error })}</div>` : ''}

            <!-- Form -->
            <form
              id="register-form"
              hx-post="/auth/register/form"
              hx-target="#form-response"
              hx-swap="innerHTML"
              class="space-y-6"
            >
              <!-- First and Last Name -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-zinc-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    class="w-full rounded-lg bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-800 transition-shadow"
                    placeholder="First name"
                  >
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-zinc-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    class="w-full rounded-lg bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-800 transition-shadow"
                    placeholder="Last name"
                  >
                </div>
              </div>

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
                  autocomplete="new-password"
                  required
                  minlength="8"
                  class="w-full rounded-lg bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-800 transition-shadow"
                  placeholder="Create a password (min. 8 characters)"
                >
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full rounded-lg bg-red-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition-colors shadow-sm"
              >
                Create Account
              </button>
            </form>

            <!-- Links -->
            <div class="mt-6 text-center">
              <p class="text-sm text-zinc-600">
                Already have an account?
                <a href="/auth/login" class="font-semibold text-red-800 hover:text-red-700 transition-colors">Sign in here</a>
              </p>
            </div>

            <div id="form-response"></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}