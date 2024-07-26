def mayorymenor(numbers:list):
    nM=0
    nm=numbers[len(numbers)-1]
    for i in range(len(numbers)-1):

        if numbers[i]<nm:
            nm=numbers[i]

        if numbers[i]>nM:
            nM=numbers[i]

    print(nm,nM)


mayorymenor([1,5,9,0,110,12,10,3,2,6,8,200,134,50,34,21,32])