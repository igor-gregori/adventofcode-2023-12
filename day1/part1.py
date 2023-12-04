soma = 0

with open('input_final.txt', 'r') as arquivo:
    for linha in arquivo:
        primeiro_numero = None
        for caractere in linha:
            if caractere.isdigit():
                primeiro_numero = caractere
                break
        
        ultimo_numero = None
        for caractere in reversed(linha):
            if caractere.isdigit():
                ultimo_numero = caractere
                break
        
        numero = int(primeiro_numero + ultimo_numero)
        soma += numero

print(soma)
