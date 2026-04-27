import { useNavigate } from 'react-router-dom';
import { getRelatorioEmprestimos } from '../api/relatoriosApi';
import homeIcon from '../assets/home.png';
import booksImg from '../assets/books.png';
import downloadIcon from '../assets/download-icon.png';

const HomePage = () => {
    const navigate = useNavigate();

    const handleDownloadRelatorio = async (tipo) => {
        try {
            const data = await getRelatorioEmprestimos();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `relatorio_${tipo}_${data.data_geracao}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            alert('Erro ao gerar relatório');
        }
    };

    return (
    <>
            <div className="w-full flex justify-center absolute bottom-160">
                <div className="w-300 h-150 bg-orange-300 rounded-[50%] text-5xl pt-70 text-white flex items-center justify-center">
                    <img className="mr-5" src={homeIcon} alt="Icone de casa"/>Home Page
                </div>
            </div>
            
            <div className="w-full flex items-center justify-center mt-100 gap-20">
                
                <div className="w-80 h-80 bg-orange-300">
                    <img className="w-full h-50" src={booksImg} alt="Livros"/>
                    <p onClick={() => navigate('/livros')} className="w-max bg-white text-orange-500 font-semibold p-2 ml-21 rounded-xl mt-10 cursor-pointer hover:bg-gray-100 transition-colors">Livros Disponíveis</p>
                    <div onClick={() => handleDownloadRelatorio('livros')} className="flex items-center justify-center mt-10 gap-1 cursor-pointer">
                        <p className="text-orange-500 underline">Extrair Relatório</p>
                        <img src={downloadIcon} alt="Icone de Download" />
                    </div>
                </div>

                <div className="w-80 h-80 bg-orange-300">
                    <img className="w-full h-50" src={booksImg} alt="Livros" />
                    <p onClick={() => navigate('/emprestimos')} className="w-max bg-white text-orange-500 font-semibold p-2 ml-15 mt-10 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">Empréstimos Disponíveis</p>
                    <div onClick={() => handleDownloadRelatorio('emprestimos')} className="flex items-center justify-center mt-10 gap-1 cursor-pointer">
                        <p className="text-orange-500 underline">Extrair Relatório</p>
                        <img src={downloadIcon} alt="Icone de Download" />
                    </div>
                </div>

            </div>
    </>
    );
}
 
export default HomePage;