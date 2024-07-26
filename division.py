def division(a: int, b: int) -> int:
    if b == 0:
        raise Exception('Error division by 0')

    if a == 0:
        return 0

    negative_result = (a < 0) != (b < 0)
    a, b = abs(a), abs(b)
    quotient = 0
    power = 31

    while a >= b:
        while (b << power) > a:
            power -= 1
        quotient += 1 << power
        a -= b << power

    return -quotient if negative_result else quotient

asw = division(2147483648, 1)
print(asw)
