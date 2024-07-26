class Solution:
    def singleNumber(self, nums: list) -> int:
        single=0
        for i in nums:
            single^=i
        return single

obj=Solution()
print(obj.singleNumber([2,2,1]))