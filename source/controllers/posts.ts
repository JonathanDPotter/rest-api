import { Request, Response } from "express";
import Post from "../models/post";
import logger from "../utils/logger";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().exec();
    res.status(200).json({ posts, count: posts.length });
  } catch (error: any) {
    const { message } = error;
    logger.error(message, error);
    res.status(500).json({ message, error });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params).exec();
    res.status(200).json({ post });
  } catch (error: any) {
    const { message } = error;
    logger.error(message, error);
    res.status(500).json({ message, error });
  }
};

const createPost = async (req: Request, res: Response) => {
  const newUser = req.body;

  try {
    const post = await Post.create(newUser);
    post.save();
    res.status(200).json({ success: true });
  } catch (error: any) {
    const { message } = error;
    logger.error(message, error);
    res.status(500).json({ success: false, message, error });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    logger.info(req.body);
    const updated = await Post.findByIdAndUpdate(req.params).exec();
    logger.info(updated._doc);
    res.status(200).json({ success: true });
  } catch (error: any) {
    const { message } = error;
    logger.error(message, error);
    res.status(500).json({ success: false, message, error });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params, req.body);
    logger.info(deleted._doc);
    res.status(200).json({ success: true });
  } catch (error: any) {
    const { message } = error;
    logger.error(message, error);
    res.status(500).json({ success: false, message, error });
  }
};

const controller = { getPosts, getPost, createPost, updatePost, deletePost };

export default controller;
