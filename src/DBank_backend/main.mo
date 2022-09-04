import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor DBank {
  stable var currentValue: Float = 300;
  stable var startTime = Time.now();
  Debug.print(debug_show(startTime));

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount: Float) {
    let tempValue: Float = currentValue - amount;
    if(tempValue >= 0){
      currentValue := tempValue;
      Debug.print(debug_show(currentValue));
    }else{
      Debug.print("Amount too Large, currentValue less then zero.");
    };
  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() : async Float {
    let currentTime = Time.now();
    let timeELapsedNS = currentTime - startTime;
    let timeELapsedS = timeELapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeELapsedS));
    startTime := currentTime;
    return currentValue;
  };
}