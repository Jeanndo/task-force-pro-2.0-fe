/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import SignUpForm from '@/components/forms/SignupForm'
import Link from 'next/link'
import React, { FC } from 'react'

const Register: FC = () => {
    return (
        <div className="bg-blue-500  flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block clip-path-shape">
                <div className="bg-white min-h-screen">

                    <div className="space-y-16 relative flex flex-col justify-center items-center">
                        <div className="absolute top-20">
                            <h2 className="text-center text-6xl text-gray-700">
                                Effortless financial records tracking.
                            </h2>
                        </div>

                        <div className="absolute top-40">
                            <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">

                                <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" />

                                <div className="w-full px-8 absolute top-8">
                                    <div className="flex justify-between">
                                        <div className="">
                                            <p className="font-light">
                                                Name
                                            </p>
                                            <p className="font-medium tracking-widest text-[10px]">
                                                Jean De Dieu UKWITEGETSE
                                            </p>
                                        </div>
                                        <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-light">
                                            Card Number
                                        </p>
                                        <p className="font-medium tracking-more-wider">
                                            ****  ****  ****  **32
                                        </p>
                                    </div>
                                    <div className="pt-6 pr-6">
                                        <div className="flex justify-between">
                                            <div className="">
                                                <p className="font-light text-xs">
                                                    Valid
                                                </p>
                                                <p className="font-medium tracking-wider text-sm">
                                                    11/15
                                                </p>
                                            </div>
                                            <div className="">
                                                <p className="font-light text-xs">
                                                    Expiry
                                                </p>
                                                <p className="font-medium tracking-wider text-sm">
                                                    03/25
                                                </p>
                                            </div>

                                            <div className="">
                                                <p className="font-light text-xs">
                                                    CVV
                                                </p>
                                                <p className="font-bold tracking-more-wider text-sm">
                                                    ****
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="absolute top-60">
                            <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">

                                <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/Zi6v09P.png" />

                                <div className="w-full px-8 absolute top-8">
                                    <div className="flex justify-between">
                                        <div className="">
                                            <p className="font-light">
                                                Name
                                            </p>
                                            <p className="font-medium tracking-widest text-[10px]">
                                                Jean De Dieu UKWITEGETSE
                                            </p>
                                        </div>
                                        <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-light">
                                            Card Number
                                        </p>
                                        <p className="font-medium tracking-more-wider">
                                            ****  ****  ****  **14
                                        </p>
                                    </div>
                                    <div className="pt-6 pr-6">
                                        <div className="flex justify-between">
                                            <div className="">
                                                <p className="font-light text-xs">
                                                    Valid
                                                </p>
                                                <p className="font-medium tracking-wider text-sm">
                                                    11/15
                                                </p>
                                            </div>
                                            <div className="">
                                                <p className="font-light text-xs">
                                                    Expiry
                                                </p>
                                                <p className="font-medium tracking-wider text-sm">
                                                    03/25
                                                </p>
                                            </div>

                                            <div className="">
                                                <p className="font-light text-xs">
                                                    CVV
                                                </p>
                                                <p className="font-bold tracking-more-wider text-sm">
                                                    ****
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:p-20 md:p-52 sm:20 p-8 w-full lg:w-1/2 2xl:p-40">
                <h1 className="text-2xl font-semibold mb-8 text-white text-center">Welcome to e-wallet!!</h1>
                <div className="bg-white shadow-2xl p-2 rounded-sm">
                    <SignUpForm />
                </div>

                <div className="mt-6 text-white text-center">
                    <Link href="/" className="underline">Have account? Login here</Link>
                </div>
                <h2 className="text-sm text-white  text-center mt-8">Powered by Task Force Pro 2.0 Student.</h2>
            </div>
        </div>
    )
}

export default Register