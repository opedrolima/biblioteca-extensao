const HomePage = () => {
    return (
    <>
            <div className="w-full flex justify-center absolute bottom-160">
                <div
                className="w-300 h-150 bg-orange-300 rounded-[50%] text-5xl pt-70 text-white flex items-center justify-center"
                >
                    <img className="mr-5" src="../src/assets/home.png" alt="Icone de casa"/>Home Page
                </div>
            </div>
            
            <div className="w-full flex items-center justify-center mt-100 gap-20">
                
                <div className="w-80 h-80 bg-orange-300">
                    <img className="w-full h-50" src="../src/assets/books.png" alt="Livros"/>
                    <p className="w-max bg-white text-orange-500 font-semibold p-2 ml-21 rounded-xl mt-10 cursor-pointer">Livros Disponíveis</p>
                    <div className="flex items-center justify-center mt-10 gap-1 cursor-pointer">
                        <p
                        className="text-orange-500 underline">
                            Extrair Relatório
                        </p>
                        <img src="../src/assets/download-icon.png" alt="Icone de Download" />
                    </div>
                </div>

                <div className="w-80 h-80 bg-orange-300">
                    <img className="w-full h-50" src="../src/assets/books.png" alt="Livros" />
                    <p className="w-max bg-white text-orange-500 font-semibold p-2 ml-15 mt-10 rounded-xl cursor-pointer">Empréstimos Disponíveis</p>
                    <div className="flex items-center justify-center mt-10 gap-1 cursor-pointer">
                        <p
                        className="text-orange-500 underline">
                            Extrair Relatório
                        </p>
                        <img src="../src/assets/download-icon.png" alt="Icone de Download" />
                    </div>
                </div>

            </div>
    </>
    );
}
 
export default HomePage;