import React from 'react';

const Contact = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-between bg-white">
            {/* Main content */}
            <div className="flex-grow flex items-center justify-center">
                <div className="text-3xl font-gamja text-center text-black leading-relaxed">
                    <p>Contact us at:</p>
                    <p>anushka031205@gmail.com</p>
                    <p>or tag me on X as:</p>
                    <a href='https://x.com/itz_nush312' className="text-blue-500 hover:underline" target="_blank" 
  rel="noopener noreferrer">@itz_nush312</a>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#61CD5E] text-3xl font-bold font-gantari text-white text-center py-4 w-full">
                @VerdeFi
            </footer>
        </div>
    );
};

export default Contact;
