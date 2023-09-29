function merge(nums1, m, nums2, n) {
    let newArr = [];
    for(let i,j=0;i<n,j<m;j++){
        if(nums2[i]>=nums1[j]){
            newArr.push(nums1[j]);
            console.log("newArr1: ",newArr);
        }else if(nums2[i]<nums1[j]){
            newArr.push(nums2[i]);
            console.log("newArr2: ",newArr);
            i++;
        }
        if(j>=m){
        newArr.push(...nums2.slice(i));
        }
        console.log("newArr2: ",newArr);
    }
    for(let k =0;k<m+n;k++){
        nums1[k] = newArr[k];
    }
};

merge([1,2,3,0,0,0],3,[2,5,6],3);