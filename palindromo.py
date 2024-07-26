def ispalindromo(word:str):
    s = word.lower().replace(" ", "")
    inversew=''
    for i in range(1,len(s)+1):
        inversew+=s[-i]
    return s==inversew

asw=ispalindromo('A man, a plan, a canal: Panama')
print(asw)