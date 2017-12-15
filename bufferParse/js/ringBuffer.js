/**
 * Created by mjx on 2017/4/12.
 */

var objLoader= new THREE.OBJLoader();
var mtlLoader = new THREE.MTLLoader();
function RingBuffer(N) {
    this.M=Math.pow(2,N);//数组长度
    this.init = function() {
        this.buffer = new Array(this.M);
        this.writeIndex = 0;
        this.readIndex = 0;
        this.num = 0;
    };//初始化函数
    this.ring = function (i) {
        return (i+1)&this.M;
    };//下标等于数组长度的时候要置0
    this.write = function(obj,data) {
        if (this.num <this.M) {//缓冲区没有满
            //if(obj == objLoader){
                this.buffer[ this.writeIndex] = obj.parse(data);
            console.log("写入的元素为<--" +  this.buffer[ this.writeIndex]);
            console.log(this.buffer[ this.writeIndex]);
            //}else if (obj == mtlLoader) {
            //    this.buffer[ this.writeIndex] = mtlLoader.parse(data);
            //    console.log("写入的元素为<--" +  this.buffer[ this.writeIndex]);
            //}
            this.writeIndex = this.ring( this.writeIndex);//移到下一个内存块
            this.num++;
        } else {
            console.log("缓冲区满了");
        }
    };//写函数
    this.read = function () {
        var pos;
        if (this.num> 0) {//缓冲区不为空
            this.pos = this.readIndex;
            this.readIndex = this.ring(this.readIndex);
            this.num--;
            console.log("读出的元素为-->" +  this.buffer[this.pos]);
            return  this.buffer[this.pos];
        } else {
            console.log("缓冲区为空");
            return 0;
        }
    };//读函数
}

//rb.read();


//1.环的长度：2的n次方，
//    当x=2^n(n为自然数)时，
//    a % x = a & (x  - 1 )，位运算符比取余运算符效率高
//2.停止读，停止写（控制速度）
//    通过下标writeIndex和readIndex比较，a.读快 停止读
//                                        b.写快--当环满了及读写位置一样，停止写入
//3.控制边界--元素个数不能超过环形区长度