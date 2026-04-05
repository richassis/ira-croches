# 📦 Como Adicionar Novas Bolsas

Guia passo a passo para adicionar novos produtos ao site **Ira Crochês**.

## 🎯 O que você vai precisar

- Imagem da bolsa (formato JPG ou PNG)
- Nome da bolsa
- Descrição
- Preço
- Cores disponíveis

## 📝 Passo a Passo

### Passo 1: Adicionar a Imagem

1. Coloque a foto da bolsa na pasta `public/`
2. Nomeie o arquivo de forma sequencial: `bolsa5.jpg`, `bolsa6.jpg`, etc.
3. **Dica**: Use imagens quadradas (mesma largura e altura) para melhor visualização

**Exemplo**:
```
public/
├── bolsa1.jpg  ✅ (já existe)
├── bolsa2.jpg  ✅ (já existe)
├── bolsa3.jpg  ✅ (já existe)
├── bolsa4.jpg  ✅ (já existe)
├── bolsa5.jpg  ⭐ (nova bolsa)
└── bolsa6.jpg  ⭐ (nova bolsa)
```

### Passo 2: Adicionar no Código

1. Abra o arquivo:
   ```
   src/data/products.js
   ```

2. Role até o final do array `products`

3. **Copie** um produto existente (ex: o último)

4. **Cole** no final do array (dentro dos colchetes `[]`)

5. **Edite** os campos:

```javascript
{
  id: 5,                              // ⭐ Próximo número (5, 6, 7...)
  name: "Bolsa Artesanal Nova",       // ⭐ Nome da bolsa
  description: "Descrição detalhada", // ⭐ Descrição
  price: 175.00,                      // ⭐ Preço (SEM R$, use ponto)
  image: "/bolsa5.jpg",               // ⭐ Nome da imagem (com /)
  category: "classic",                // "classic" ou "premium"
  colors: ["Preto", "Dourado"],       // ⭐ Cores disponíveis
  inStock: true,                      // true = disponível
  featured: true,                     // true = aparece na home
}
```

### Passo 3: Salvar e Ver o Resultado

1. **Salve** o arquivo (`Ctrl + S`)
2. O site atualiza automaticamente
3. A nova bolsa aparece na página inicial

**Não precisa reiniciar nada!** ✨

## ✏️ Exemplo Completo

Vamos adicionar uma nova bolsa chamada "Bolsa Verão":

**Antes** (products.js):
```javascript
export const products = [
  {
    id: 1,
    name: "Bolsa Artesanal Classic",
    // ...
  },
  {
    id: 2,
    name: "Bolsa Artesanal Premium",
    // ...
  },
  {
    id: 3,
    name: "Bolsa Artesanal Elegance",
    // ...
  },
  {
    id: 4,
    name: "Bolsa Artesanal Deluxe",
    // ...
  },
  // ⭐ Vamos adicionar aqui
];
```

**Depois** (products.js):
```javascript
export const products = [
  {
    id: 1,
    name: "Bolsa Artesanal Classic",
    // ...
  },
  {
    id: 2,
    name: "Bolsa Artesanal Premium",
    // ...
  },
  {
    id: 3,
    name: "Bolsa Artesanal Elegance",
    // ...
  },
  {
    id: 4,
    name: "Bolsa Artesanal Deluxe",
    // ...
  },
  {
    id: 5,
    name: "Bolsa Verão",
    description: "Perfeita para dias ensolarados. Cores vibrantes e design leve.",
    price: 165.00,
    image: "/bolsa5.jpg",
    category: "classic",
    colors: ["Amarelo", "Laranja"],
    inStock: true,
    featured: true,
  },
];
```

## 🎨 Dicas de Preenchimento

### Campo `id`
- Sempre use o **próximo número** da sequência
- Se a última bolsa é `id: 4`, a próxima é `id: 5`

### Campo `name`
- Seja criativo mas descritivo
- Exemplos: "Bolsa Verão", "Bolsa Noite Elegante", "Bolsa Classic Grande"

### Campo `description`
- Descreva o produto de forma atrativa
- Destaque características únicas
- 1-2 frases são suficientes

### Campo `price`
- Use **ponto** (não vírgula): `150.00` ✅, `150,00` ❌
- Não coloque `R$`, apenas o número
- Use sempre 2 casas decimais: `150.00` ✅, `150` ❌

### Campo `image`
- Sempre comece com `/`: `/bolsa5.jpg` ✅
- Nome do arquivo deve ser exatamente igual ao da pasta `public/`
- Caixa alta/baixa importa: `Bolsa5.jpg` ❌, `bolsa5.jpg` ✅

### Campo `category`
- `"classic"` = Bolsas clássicas/tradicionais
- `"premium"` = Bolsas mais elaboradas/exclusivas

### Campo `colors`
- Lista de cores disponíveis
- Formato: `["Preto", "Marrom"]`
- Separe com vírgula

### Campo `inStock`
- `true` = Produto disponível
- `false` = Produto esgotado (aparece como "Esgotado")

### Campo `featured`
- `true` = Aparece na home (em destaque)
- `false` = Não aparece na home

## 🚨 Erros Comuns

### ❌ Esqueci a vírgula no final
```javascript
{
  id: 5,
  name: "Bolsa Nova"  // ❌ Falta vírgula aqui
}
{
  id: 6,  // ❌ Vai dar erro
  // ...
}
```

✅ **Correto**:
```javascript
{
  id: 5,
  name: "Bolsa Nova",  // ✅ Vírgula adicionada
},
{
  id: 6,
  // ...
}
```

### ❌ Imagem com caminho errado
```javascript
image: "bolsa5.jpg"  // ❌ Falta a barra /
```

✅ **Correto**:
```javascript
image: "/bolsa5.jpg"  // ✅ Com barra
```

### ❌ Preço com vírgula
```javascript
price: 150,00  // ❌ JavaScript não entende vírgula em número
```

✅ **Correto**:
```javascript
price: 150.00  // ✅ Use ponto
```

## 📱 Como Remover uma Bolsa

1. Abra `src/data/products.js`
2. Encontre o produto que quer remover
3. Delete o objeto completo (do `{` até `},`)
4. Salve o arquivo

**Exemplo**:
```javascript
// Vamos remover a Bolsa 3
export const products = [
  {
    id: 1,
    name: "Bolsa 1",
    // ...
  },
  {
    id: 2,
    name: "Bolsa 2",
    // ...
  },
  // ⬇️ DELETE ESTE BLOCO INTEIRO ⬇️
  {
    id: 3,
    name: "Bolsa 3",
    // ...
  },
  // ⬆️ ATÉ AQUI ⬆️
  {
    id: 4,
    name: "Bolsa 4",
    // ...
  },
];
```

## 🔄 Como Editar uma Bolsa Existente

1. Abra `src/data/products.js`
2. Encontre o produto que quer editar
3. Altere apenas os campos necessários
4. Salve o arquivo

**Exemplo**: Alterar preço da Bolsa 1 de R$ 150 para R$ 170

```javascript
{
  id: 1,
  name: "Bolsa Artesanal Classic",
  description: "...",
  price: 170.00,  // ⭐ Alterado de 150.00 para 170.00
  // ... resto inalterado
}
```

## ⚙️ Como Atualizar o Número do WhatsApp

1. Abra `src/data/products.js`
2. Role até o final do arquivo
3. Encontre `storeConfig`:

```javascript
export const storeConfig = {
  name: "Ira Crochês",
  phone: "53984520981",  // ⭐ Altere aqui
  instagram: "@silveirairacina",
  // ...
};
```

4. Altere o número (formato: DDD + número, sem espaços)
5. Salve

**Exemplo**:
- WhatsApp: (53) 98452-0981
- Código: `"53984520981"` (sem parênteses, sem traços, sem espaços)

## 🎯 Checklist Final

Ao adicionar uma nova bolsa, verifique:

- [ ] Imagem está na pasta `public/`
- [ ] Imagem tem nome correto (ex: `bolsa5.jpg`)
- [ ] `id` é único e sequencial
- [ ] `name` está preenchido
- [ ] `description` está preenchida
- [ ] `price` usa **ponto** (não vírgula)
- [ ] `image` começa com `/`
- [ ] `colors` é um array `["cor1", "cor2"]`
- [ ] Tem vírgula no final do objeto `},`
- [ ] Salvou o arquivo
- [ ] Verificou no navegador

## 💡 Precisa de Ajuda?

Se tiver dúvidas:
1. Confira os exemplos existentes em `src/data/products.js`
2. Use exatamente o mesmo formato
3. Teste adicionar uma bolsa de teste primeiro

---

**Pronto!** Agora você sabe adicionar, editar e remover bolsas do site! 🎉
