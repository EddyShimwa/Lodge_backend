import React from 'react'

const login = () => {
  return (
<div className="flex flex-col  mx-auto px py-5 rounded-md dark:bg-gray-50 dark:text-gray-800 ">
    <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign in</h1>
        <p className="text-sm dark:text-gray-600">Please sign in to continue</p>
    </div>
    <form noValidate="" action="" className="space-y-12 mx-10">
        <div className="space-y-4">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-20 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
            </div>
            <div>
                <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm">Password</label>
                </div>
                <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
            </div>
        </div>
        <div className="space-y-2">
            <div>
                <button type="button" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Sign in</button>
            </div>
        </div>
    </form>
</div>
  )
}

export default login
