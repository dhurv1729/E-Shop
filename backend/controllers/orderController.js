import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

export const addOrderItems = asyncHandler(async (req, res) => {



  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.lenght == 0) {

    res.status(400)
    throw new Error('No Ordered Items');
  } 
  else {

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      user: req.user._id
    });

    const newOrder = await order.save();
    res.status(201);
    res.json(newOrder)
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if(order) {
    res.json(order);
  }
  else {
    res.status(404);
    throw new Error('Order not Found');
  }
});

export const updateOrderTOPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order) {
    order.isPaid = true,
    order.paidAt = Date.Now(),
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    const updateOrder = await order.save();
    res.json(updateOrder)
  }
  else {
    res.status(404);
    throw new Error('Order not Found');
  }
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  res.json(orders);
});

