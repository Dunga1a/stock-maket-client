import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts, Users, Comments } from 'src/utils/typeorm';
import { CreatePostDto } from './dtos/CreatePostDto.dtos';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async createPost(
    newsPostData: CreatePostDto,
    userId: number,
  ): Promise<Posts> {
    // const user = await this.userRepository.findOne(userId, {
    //   relations: ['user'],
    // });
    const user = await this.userRepository.findOne(userId);

    //const category = await this.newsCategoryRepository.findOne(categoryId, {relations:['member']});

    if (!user) {
      throw new HttpException(
        'Không có dữ liệu người dùng',
        HttpStatus.NOT_FOUND,
      );
    }

    const newsPost = new Posts();
    newsPost.title = newsPostData.title;
    newsPost.content = newsPostData.content;
    newsPost.image = newsPostData.image;
    newsPost.user = user;

    const savedNewsPost = await this.postRepository.save(newsPost);
    //console.log(savedNewsPost);
    return savedNewsPost;
  }

  async getAllPost() {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comment') // 'comments' là tên field trong Posts entity
      .getMany();

    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new HttpException('Không có dữ liệu', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  //   async updatePost(postId: number, updatePostData: UpdatePostDto) {
  //     const post = await this.newsPostRepository.findOne(postId);
  //     if (!post) {
  //       throw new HttpException('Không tìm thấy bài viết', HttpStatus.NOT_FOUND);
  //     }

  //     post.title = updatePostData.title;
  //     post.subcontent = updatePostData.subcontent;
  //     post.content = updatePostData.content;
  //     post.slug = updatePostData.slug;
  //     post.image = updatePostData.image;

  //     const updatedPost = await this.newsPostRepository.save(post);

  //     return updatedPost;
  //   }

  async deletePost(postId: number) {
    const removePost = await this.postRepository.delete(postId);
    return removePost;
  }

  async deleteMultiple(ids: number[]) {
    return await this.postRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  //   async getNewsByCategoryAndStatusWithPagination(
  //     category?: number | null,
  //     status?: boolean | null,
  //     page: number = 1,
  //     pageSize: number = 4,
  //     id?: number | null,
  //   ) {
  //     const skip = (page - 1) * pageSize;
  //     const user = await this.userRepository.findOne(id);
  //     //console.log(user.roles.find((role) => console.log(role.name)));
  //   }
  //   async getAllPosts(
  //     status: string = '1',
  //     page: number = 1,
  //     pageSize: number = 4,
  //   ) {
  //     const skip = (page - 1) * pageSize;

  //     const queryBuilder = this.postRepository
  //       .createQueryBuilder('NewsPost')
  //       .leftJoinAndSelect('NewsPost.newsCategory', 'NewsCategory')
  //       .leftJoinAndSelect('NewsPost.user', 'User')
  //       .leftJoinAndSelect('User.member', 'Member')
  //       .leftJoinAndSelect('User.roles', 'Role')
  //       //.where('NewsPost.status = :status', Ơ)
  //       .orderBy('NewsPost.created_at', 'DESC')
  //       .skip(skip)
  //       .take(pageSize);

  //     if (status !== null && status !== undefined) {
  //       queryBuilder.andWhere('NewsPost.status = :status', { status });
  //     }

  //     const [data, count] = await queryBuilder.getManyAndCount();

  //     return { data, count };
  //   }

  //   async getPostBySlugOfCategory(item: any, queryParams: any) {
  //     const page = Number(queryParams.page);
  //     const pageSize = 8;
  //     const query = await this.newsPostRepository
  //       .createQueryBuilder('post')
  //       .leftJoinAndSelect('post.newsCategory', 'category')
  //       .where('post.status = :status', { status: 1 })
  //       .andWhere(
  //         '(category.news_category_id = :news_category_id OR category.father_id = :father_id)',
  //         {
  //           news_category_id: item,
  //           father_id: item,
  //         },
  //       )
  //       .skip((page - 1) * pageSize)
  //       .take(pageSize)
  //       .orderBy('post.id', 'DESC')
  //       .getMany();
  //     for (const item of query) {
  //       const count = await this.commentRepository
  //         .createQueryBuilder('comment')
  //         .leftJoinAndSelect('comment.post', 'post')
  //         .where('post.id = :id', { id: item.id })
  //         .getCount();
  //       item['count'] = count;
  //       // console.log('item: ', item);
  //     }

  //     const queryCount = await this.newsPostRepository
  //       .createQueryBuilder('post')
  //       .leftJoinAndSelect('post.newsCategory', 'category')
  //       .where('post.status = :status', { status: 1 })
  //       .andWhere(
  //         '(category.news_category_id = :news_category_id OR category.father_id = :father_id)',
  //         {
  //           news_category_id: item,
  //           father_id: item,
  //         },
  //       )

  //       .getCount();
  //     return { query, queryCount };
  //   }
}