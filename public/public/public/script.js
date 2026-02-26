document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: document.getElementById("nome").value,
    municipio: document.getElementById("municipio").value,
    telefone: document.getElementById("telefone").value,
    presenca: document.getElementById("presenca").value,
    observacoes: document.getElementById("observacoes").value
  };

  try {
    const response = await fetch("/confirmar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      document.getElementById("msg").innerText =
        "Confirmação enviada com sucesso!";
      document.getElementById("form").reset();
    } else {
      document.getElementById("msg").innerText =
        "Erro ao enviar confirmação.";
    }
  } catch (error) {
    document.getElementById("msg").innerText =
      "Erro de conexão com o servidor.";
  }
});
