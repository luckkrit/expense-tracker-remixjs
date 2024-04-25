import dashboard from '../assets/dashboard2.png'
export const Hero = () => {
    return (
        <section className="bg-gray-50 flex flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Manage Your Expense
                        <strong className="font-extrabold text-red-700 sm:block">Control your Money</strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Start Creating your budget and save ton of money
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="#"
                        >
                            Get Started
                        </a>

                        {/* <a
                            className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                            href="#"
                        >
                            Learn More
                        </a> */}
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <img src={dashboard} width={1000} height={700} alt='Dashboard' className='-mt-9 rounded-xl border-2' />
            </div>
        </section>
    )
}
