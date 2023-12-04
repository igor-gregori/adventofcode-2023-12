int_numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
str_numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

soma = 0

with open('input_final.txt', 'r') as arquivo:
    for linha in arquivo:
        arranjo = []

        for int_number in int_numbers:
            posicao = linha.find(int_number)
            while posicao != -1:
                arranjo.append((int_number, posicao))
                posicao = linha.find(int_number, posicao + 1)

        for str_number in str_numbers:
            posicao = linha.find(str_number)
            while posicao != -1:
                arranjo.append((str_number, posicao))
                posicao = linha.find(str_number, posicao + 1)

        menor_tupla = min(arranjo, key=lambda tupla: tupla[1])
        maior_tupla = max(arranjo, key=lambda tupla: tupla[1])

        menor_tupla_valor = menor_tupla[0]
        maior_tupla_valor = maior_tupla[0]

        if not menor_tupla_valor.isdigit():
            menor_tupla_valor = int_numbers[str_numbers.index(menor_tupla_valor)]

        if not maior_tupla_valor.isdigit():
            maior_tupla_valor = int_numbers[str_numbers.index(maior_tupla_valor)]

        soma += int(menor_tupla_valor + maior_tupla_valor)

print(soma)
