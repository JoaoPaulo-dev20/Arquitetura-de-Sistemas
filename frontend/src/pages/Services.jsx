export default function Services({ setPage }) {
  const servicos = [
    {
      id: 1,
      nome: 'Limpeza e Profilaxia',
      descricao: 'Limpeza profunda dos dentes e remoção de tártaro',
      preco: 'R$ 150,00'
    },
    {
      id: 2,
      nome: 'Clareamento Dental',
      descricao: 'Clareamento profissional para dentes mais brancos',
      preco: 'R$ 500,00'
    },
    {
      id: 3,
      nome: 'Restauração',
      descricao: 'Restauração de cáries com resinas compostas',
      preco: 'R$ 200,00'
    },
    {
      id: 4,
      nome: 'Tratamento de Canal',
      descricao: 'Endodontia para salvar dentes comprometidos',
      preco: 'R$ 800,00'
    },
    {
      id: 5,
      nome: 'Implante Dentário',
      descricao: 'Implante de titânio com coroa protética',
      preco: 'R$ 2.500,00'
    },
    {
      id: 6,
      nome: 'Ortodontia',
      descricao: 'Aparelhos fixos ou móveis para correção de mordida',
      preco: 'A partir de R$ 100,00/mês'
    }
  ]

  return (
    <div className="page">
      <h2> Nossos Serviços</h2>
      <p>
        Oferecemos uma ampla gama de serviços odontológicos para cuidar da sua saúde bucal.
      </p>
      
      <div className="services-grid">
        {servicos.map((servico) => (
          <div key={servico.id} className="service-card">
            <h3>{servico.nome}</h3>
            <p>{servico.descricao}</p>
            <div className="service-price">{servico.preco}</div>
            <button onClick={() => setPage('appointment')} className="btn-agendar">
              Agendar Consulta
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
