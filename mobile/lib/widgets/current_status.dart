import 'package:flutter/material.dart';
import 'package:mobile/styles/text.dart';

final statusBoxDecoration = BoxDecoration(
  color: const Color(0xFF1F2D40),
  borderRadius: BorderRadius.circular(12),
);

class CurrentStatusWidget extends StatefulWidget{
  const CurrentStatusWidget({super.key});

  @override
  State<StatefulWidget> createState() => _CurrentStatusWidget();
}

class _CurrentStatusWidget extends State<CurrentStatusWidget>{
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        children: [
          Expanded(flex: 1,child: Container(
            decoration: statusBoxDecoration,
            padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.air, color: Colors.white, size: 20,),
                const SizedBox(width: 4),
                Text("22km/h", style: defaultText.withSize(18),)
              ],
            ),
          )),
          const SizedBox(width: 8,),
          Expanded(flex: 1,child: Container(
            decoration: statusBoxDecoration,
            padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.beach_access, color: Colors.white, size: 20,),
                const SizedBox(width: 4),
                Text("80%", style: defaultText.withSize(18),)
              ],
            ),
          )),
          const SizedBox(width: 8,),
          Expanded(flex: 1,child: Container(
            decoration: statusBoxDecoration,
            padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.water_drop, color: Colors.white, size: 20,),
                const SizedBox(width: 4),
                Text("43%", style: defaultText.withSize(18),)
              ],
            ),
          ))
        ],
      ),
    );
  }
}