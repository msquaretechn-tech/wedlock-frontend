import { useState } from 'react';
import '../../font.css';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.wedlock.wedlock_application";

const GetApp = () => {
    const [qrImage, setQrImage] = useState("/Wedlock Play Store QR Wallpaper (Rounded) - Galaxy S24.png"); // Default QR

    const handleAppStoreClick = () => {
        // window.open("https://apps.apple.com/app/id...", "_blank");
        setQrImage("/Wedlock App Store QR Wallpaper (Rounded) - iPhone 16 Pro Max.png"); // Update with actual Apple QR image if available
    };

    // The link itself opens the store; clicking also swaps the QR code shown beside the badges
    const showPlayStoreQr = () => {
        setQrImage("/Wedlock Play Store QR Wallpaper (Rounded) - Galaxy S24.png"); // Update with actual Google QR image if available
    };

    return (
        <div className="w-full h-auto bg-[#007EAF] relative">
            <div className="text-white relative overflow-hidden px-5 sm:px-20 container m-auto space-y-2 py-5 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center lg:items-start flex-wrap">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start w-full justify-between">
                        <div className="max-w-[600px]">
                            <div className="get_app">
                                <h1 className="text-[40px] md:text-[48px] xl:text-[55px] xl:leading-[83.2px] font-[Proxima-Nova-Bold] tracking-[-0.02em]">
                                    Get the Wedlock app
                                </h1>
                                <p className="text-[20px] font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] pt-[21px] leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start">
                                    Browse matches, message and video call from your phone. <br className='hidden md:block' /> Free to download, free to join.
                                </p>
                            </div>
                            <div className="flex flex-row space-x-4 mt-5 lg:mt-12">
                                
                                {/* A real link (not a button) so it works without JS, can be opened in a new tab, and is crawlable */}
                                <a
                                    href={PLAY_STORE_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-0 m-0 flex items-center transition-transform hover:scale-105 active:scale-95"
                                    onClick={showPlayStoreQr}
                                >
                                    <img
                                        src="/googleplay.png"
                                        alt="Get it on Google Play"
                                        className="h-14 md:h-20 lg:h-16"
                                    />
                                </a>

                                <button
                                    className="p-0 m-0 flex items-center transition-transform hover:scale-105 active:scale-95"
                                    onClick={handleAppStoreClick}
                                >
                                    <img
                                        src="/appstore.png"
                                        alt="Apple Store"
                                        className="h-14 md:h-20 lg:h-16"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="relative mt-8 lg:mt-0 w-full max-w-[300px] md:max-w-[350px]">
                            <div className="relative w-full h-full">
                                <img
                                    src={qrImage}
                                    alt="Phone"
                                    className="w-full"
                                />

                                {/* <img
                                    src="/ph.svg"
                                    alt="Phone"
                                    className="w-full"
                                /> */}
                                {/* <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] flex items-center justify-center">
                                    <img
                                        src={qrImage}
                                        alt="QR code"
                                        className="w-full h-full object-contain transition-opacity duration-300"
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute hidden lg:block top-0 right-0 bg-[url('/topcircle.png')] bg-cover bg-center h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] w-20 sm:w-40 md:w-60 lg:w-96">
                </div>
            </div>
        </div>
    );
};

export default GetApp;